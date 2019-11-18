import yaml from 'js-yaml';
import { decode } from 'ini';

const parser = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: decode,
};

export default (file, format) => parser[format](file);
