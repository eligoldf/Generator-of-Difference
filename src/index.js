import fs from 'fs';
import { has } from 'lodash';
import path from 'path';
import parser from './parsers';

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
      return { ...acc, [key]: 'unchanged' };
    }

    return { ...acc, [key]: 'changed' };
  }, {});
};

const parseFile = (filePath) => {
  const file = fs.readFileSync(filePath, 'utf-8');
  const fileFormat = path.extname(filePath).split('.')[1];
  return parser(file, fileFormat);
};

const genDiff = (path1, path2) => {
  const firstFile = parseFile(path1);
  const secondFile = parseFile(path2);

  const objDiffState = {
    added: (key) => ` + ${key}: ${secondFile[key]}`,
    deleted: (key) => ` - ${key}: ${firstFile[key]}`,
    unchanged: (key) => `  ${key}: ${secondFile[key]}`,
    changed: (key) => ` + ${key}: ${secondFile[key]}\n  - ${key}: ${firstFile[key]}`,
  };

  const compareObj = showDiff(firstFile, secondFile);

  const comparedObjKeys = Object.keys(compareObj);

  const result = comparedObjKeys.reduce((acc, key) => `${acc} ${objDiffState[compareObj[key]](key)}\n`, '');

  return `{\n ${result}}`;
};

export default genDiff;
