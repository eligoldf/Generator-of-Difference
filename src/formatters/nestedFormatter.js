import { flatten } from 'lodash/fp';


const stringify = (value, depth, space) => {
  const makeSpace = ' '.repeat(space + depth * space);

  if (typeof value !== 'object') {
    return value;
  }

  const keys = Object.keys(value);
  const result = keys.map((key) => `${key}: ${value[key]}`).join('\n');
  return `{\n${makeSpace}${result}\n${' '.repeat(depth * space)}}`;
};

const getString = (space, sign, name, valueParams) => `${space}${sign} ${name}: ${stringify(...valueParams)}`;

const nestedFormatter = (tree, depth = 0) => {
  const braceSpace = 2;
  const textSpace = 4;

  const spaceLength = braceSpace + depth * textSpace;
  const makeSpace = ' '.repeat(spaceLength);
  const typeMap = {
    added: ({ name, valueTo }) => getString(makeSpace, '+', name, [valueTo, depth + 1, textSpace]),

    deleted: ({ name, valueFrom }) => getString(makeSpace, '-', name, [valueFrom, depth + 1, textSpace]),

    unchanged: ({ name, valueTo }) => getString(makeSpace, ' ', name, [valueTo, depth + 1, textSpace]),

    changed: (el) => [typeMap.added(el), typeMap.deleted(el)],

    nested: ({ children, name }) => `${makeSpace}  ${name}: ${nestedFormatter(children, depth + 1, textSpace)}`,
  };

  const mappedTree = tree.map((el) => typeMap[el.type](el));
  const flattenTree = flatten(mappedTree);
  const result = flattenTree.join('\n');

  return `{\n${result}\n${' '.repeat(spaceLength - braceSpace)}}`;
};


export default nestedFormatter;
