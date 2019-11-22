import nestedFormatter from './nestedFormatter';
import plainFormatter from './plainFormatter';
import jsonFormatter from './jsonFormatter';

const formatter = {
  nested: nestedFormatter,
  plain: plainFormatter,
  json: jsonFormatter,
};


export default (ast, format) => formatter[format](ast);
