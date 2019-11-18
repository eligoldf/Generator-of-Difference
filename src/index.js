import fs from 'fs';
import path from 'path';
import parse from './parsers';
import makeAST from './makeAST';
import render from './render';

const getObject = (filePath) => {
  const file = fs.readFileSync(filePath, 'utf-8');
  const fileFormat = path.extname(filePath).split('.')[1];
  return parse(file, fileFormat);
};

const genDiff = (path1, path2) => {
  const obj1 = getObject(path1);
  const obj2 = getObject(path2);
  const ast = makeAST(obj1, obj2);

  return render(ast);
};

export default genDiff;
