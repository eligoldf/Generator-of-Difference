import yaml from 'js-yaml';
import { decode } from 'ini';

const parser = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: decode,
};

export default (content, format) => parser[format](content);
