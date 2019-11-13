import fs from 'fs';
import { has } from 'lodash';

const showDiff = (obj1, obj2) => {
  const firstObjectKeys = Object.keys(obj1);
  const secondObjectKeys = Object.keys(obj2);
  const filteredKeys = secondObjectKeys.filter((key) => !firstObjectKeys.includes(key));

  const combinedKeys = firstObjectKeys.concat(filteredKeys);

  return combinedKeys.reduce((acc, key) => {
    if (!has(obj1, key)) {
      return { ...acc, [key]: 'added' };
    }

    if (!has(obj2, key)) {
      return { ...acc, [key]: 'deleted' };
    }

    if (obj1[key] === obj2[key]) {
      return { ...acc, [key]: 'unchange' };
    }

    return { ...acc, [key]: 'changed' };
  }, {});
};

const genDiff = (path1, path2) => {
  const firstFile = JSON.parse(fs.readFileSync(path1));
  const secondFile = JSON.parse(fs.readFileSync(path2));

  const objDiffState = {
    added: (key) => ` + ${key}: ${secondFile[key]}`,
    deleted: (key) => ` - ${key}: ${firstFile[key]}`,
    unchange: (key) => `  ${key}: ${secondFile[key]}`,
    changed: (key) => ` + ${key}: ${secondFile[key]}\n  - ${key}: ${firstFile[key]}`,
  };

  const compareObj = showDiff(firstFile, secondFile);

  const comparedObjKeys = Object.keys(compareObj);

  const result = comparedObjKeys.reduce((acc, key) => `${acc} ${objDiffState[compareObj[key]](key)}\n`, '');

  return `{\n ${result}}`;
};

export default genDiff;
