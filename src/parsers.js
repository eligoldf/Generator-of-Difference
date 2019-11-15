import yaml from 'js-yaml';
import { decode } from 'ini';

const parsers = {
  json: (file) => JSON.parse(file),
  yml: (file) => yaml.safeLoad(file),
  ini: decode,
};

export default (file, format) => parsers[format](file);
