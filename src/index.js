import fs from 'fs';
import path from 'path';
import parse from './parsers';
import makeAST from './makeAST';
import formatter from './formatters';

const getFile = (filePath) => {
  const file = fs.readFileSync(filePath, 'utf-8');
  const fileFormat = path.extname(filePath).split('.')[1];
  return parse(file, fileFormat);
};

const genDiff = (path1, path2, format) => {
  const file1 = getFile(path1);
  const file2 = getFile(path2);
  const ast = makeAST(file1, file2);

  return formatter(ast, format);
};

export default genDiff;
