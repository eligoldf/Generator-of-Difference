import fs from 'fs';
import genDiff from '../src';


describe('test genDiff', () => {
  const flatTestResult = fs.readFileSync('__tests__/__fixtures__/flatTestResult.txt', 'utf8');
  const flatFileTypes = ['json', 'yml', 'ini'];

  const nestedTestResult = fs.readFileSync('__tests__/__fixtures__/nestedTestResult.txt', 'utf8');
  const nestedFileTypes = ['json', 'yml', 'ini'];

  test.each(flatFileTypes)(
    'finding diff between flat %s files',
    (type) => {
      const before = `__tests__/__fixtures__/before.${type}`;
      const after = `__tests__/__fixtures__/after.${type}`;
      expect(genDiff(before, after)).toBe(flatTestResult);
    },
  );

  test.each(nestedFileTypes)(
    'finding diff between nested %s files',
    (type) => {
      const before = `__tests__/__fixtures__/beforeNested.${type}`;
      const after = `__tests__/__fixtures__/afterNested.${type}`;
      expect(genDiff(before, after)).toBe(nestedTestResult);
    },
  );
});
