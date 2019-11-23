import fs from 'fs';
import genDiff from '../src';

describe('test genDiff', () => {
  const jsonResultPath = '__tests__/__fixtures__/resultJSON.txt';
  const resultJSON = fs.readFileSync(jsonResultPath, 'utf-8');

  const nestedResultPath = '__tests__/__fixtures__/resultNested.txt';
  const nestedResult = fs.readFileSync(nestedResultPath, 'utf-8');

  const plainResultPath = '__tests__/__fixtures__/resultPlain.txt';
  const plainResult = fs.readFileSync(plainResultPath, 'utf-8');

  const fileTypes = ['json', 'yml', 'ini'];

  describe.each(fileTypes)(
    'find difference between %s files',
    (type) => {
      const before = `__tests__/__fixtures__/before.${type}`;
      const after = `__tests__/__fixtures__/after.${type}`;

      test('JSON test', () => {
        expect(genDiff(before, after, 'json')).toBe(resultJSON);
      });

      test('nested test', () => {
        expect(genDiff(before, after, 'nested')).toBe(nestedResult);
      });

      test('plain test', () => {
        expect(genDiff(before, after, 'plain')).toBe(plainResult);
      });
    },
  );
});
