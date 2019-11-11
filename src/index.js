import fs from 'fs';
import _ from 'lodash';

const showDiff = (obj1, obj2) => {
    const diffArr = [];
    Object.keys(obj1).forEach((key) => {
      if (has(obj2, key)) {
        if (obj1[key] === obj2[key]) {
          diffArr.push(`    ${key}: ${obj2[key]}`);
        } else {
          diffArr.push(`  + ${key}: ${obj2[key]}`);
          diffArr.push(`  - ${key}: ${obj1[key]}`);
        }
      } else {
        diffArr.push(`  - ${key}: ${obj1[key]}`);
      }
    });
  
    Object.keys(obj2).forEach((key) => {
      if (!has(obj1, key)) {
        diffArr.push(`  + ${key}: ${obj2[key]}`);
      }
    });
  
    return diffArr.join('\n');
  };

const genDiff = (pathTofile1, pathTofile2) => {
    const firstFile = fs.readFileSync(pathTofile1, 'utf8');
    const secondFile = fs.readFileSync(pathTofile2, 'utf8');

    const config1 = JSON.parse(firstFile);
    const config2 = JSON.parse(secondFile);

    const diff = `{\n${showDiff(config1, config2)}\n}`;

    return diff;
};

export default genDiff;