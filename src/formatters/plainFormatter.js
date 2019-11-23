import { flatten } from 'lodash/fp';

const stringify = (value) => {
  if (typeof value === 'object') {
    return '[complex value]';
  }

  if (typeof value === 'boolean') {
    return value;
  }

  return `'${value}'`;
};

const plainFormatter = (tree, filePath = []) => {
  const getStringStart = (name) => `Property '${[...filePath, name].join('.')}' was`;

  const typeMap = {
    added: ({ valueTo }, stringStart) => `${stringStart} added with value: ${stringify(valueTo)}`,
    deleted: (el, stringStart) => `${stringStart} removed`,
    changed: ({ valueFrom, valueTo }, stringStart) => `${stringStart} updated. From ${stringify(valueFrom)} to ${stringify(valueTo)}`,
    unchanged: () => '',
    nested: ({ children, name }) => `${plainFormatter(children, [...filePath, name])}`,
  };

  const mapedTree = tree.map((el) => typeMap[el.type](el, getStringStart(el.name)));
  const flattenTree = flatten(mapedTree);
  const filteredTree = flattenTree.filter((el) => el !== '');
  const result = filteredTree.join('\n');
  return result;
};

export default plainFormatter;
