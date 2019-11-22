import { has, union } from 'lodash/fp';

const actions = [
  {
    type: 'added',
    check: (obj1, obj2, key) => !has(key, obj1) && has(key, obj2),
    action: (key, obj1, obj2) => ({ valueTo: obj2[key] }),
  },
  {
    type: 'deleted',
    check: (obj1, obj2, key) => has(key, obj1) && !has(key, obj2),
    action: (key, obj1) => ({ valueFrom: obj1[key] }),
  },
  {
    type: 'nested',
    check: (obj1, obj2, key) => typeof obj1[key] === 'object' && typeof obj2[key] === 'object',
    action: (key, obj1, obj2, fn) => ({ children: fn(obj1[key], obj2[key]) }),
  },
  {
    type: 'unchanged',
    check: (obj1, obj2, key) => obj1[key] === obj2[key],
    action: (key, obj1, obj2) => ({ valueFrom: obj1[key], valueTo: obj2[key] }),
  },
  {
    type: 'changed',
    check: (obj1, obj2, key) => has(key, obj1) && has(key, obj2) && obj1[key] !== obj2[key],
    action: (key, obj1, obj2) => ({ valueFrom: obj1[key], valueTo: obj2[key] }),
  },
];

const getAction = (obj1, obj2, key) => actions.find(({ check }) => check(obj1, obj2, key));

const makeAST = (obj1, obj2) => {
  const keys = union(Object.keys(obj2), Object.keys(obj1));
  const result = keys.map((key) => {
    const { type, action } = getAction(obj1, obj2, key);
    return { name: key, type, ...action(key, obj1, obj2, makeAST) };
  });

  return result;
};

export default makeAST;
