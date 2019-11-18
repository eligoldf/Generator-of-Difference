import { has, union, flatten } from 'lodash';

const makeAST = (obj1, obj2) => {
  const keys = union(Object.keys(obj1), Object.keys(obj2));

  const result = keys.map((key) => {
    const name = key;

    if (!has(obj1, key)) {
      const type = typeof obj2[key];
      const value = obj2[key];
      const status = 'added';
      return {
        name, type, value, status,
      };
    }

    if (!has(obj2, key)) {
      const type = typeof obj1[key];
      const value = obj1[key];
      const status = 'deleted';
      return {
        name, type, value, status,
      };
    }

    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      const status = 'changeless';
      const children = makeAST(obj1[key], obj2[key]);
      return {
        name, type: 'object', value: '', status, children,
      };
    }

    if (obj1[key] === obj2[key]) {
      const status = 'changeless';
      const type = typeof obj1[key];
      const value = obj1[key];
      return {
        name, type, value, status,
      };
    }

    const status1 = 'deleted';
    const status2 = 'added';
    const type1 = typeof obj1[key];
    const type2 = typeof obj2[key];
    const value1 = obj1[key];
    const value2 = obj2[key];

    return [
      {
        name, status: status2, type: type2, value: value2,
      },
      {
        name, status: status1, type: type1, value: value1,
      }];
  });

  return flatten(result);
};

export default makeAST;
