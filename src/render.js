const statusMap = {
  added: '+ ',
  deleted: '- ',
  changeless: '  ',
};

const makeSpace = (count) => {
  const iter = (index, result) => {
    if (index === 0) {
      return result;
    }

    return ` ${iter(index - 1, result)}`;
  };

  return iter(count, '');
};

const stringify = (data, spaceCounter) => {
  const textBreak = 6;
  const braceBreak = 2;

  if (typeof data !== 'object') {
    return data;
  }

  const space = makeSpace(spaceCounter + textBreak);
  const keys = Object.keys(data);
  const result = keys.map((key) => `${key}: ${data[key]}`).join('\n');
  return `{\n${space}${result}\n${makeSpace(spaceCounter + braceBreak)}}`;
};

const render = (ast) => {
  const textBreak = 4;
  const braceBreak = 2;
  const iter = (tree, spaceCounter) => {
    const space = makeSpace(spaceCounter);
    const result = tree.map((element) => {
      if (!element.children) {
        return `${space}${statusMap[element.status]}${element.name}: ${stringify(element.value, spaceCounter)}`;
      }

      return `${space}${statusMap[element.status]}${element.name}: ${iter(element.children, spaceCounter + textBreak)}`;
    }).join('\n');

    return `{\n${result}\n${makeSpace(spaceCounter - braceBreak)}}`;
  };

  return iter(ast, 2);
};

export default render;
