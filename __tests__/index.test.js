import fs from 'fs';
import genDiff from '../src';

const beforeJsonPath = '__tests__/__fixtures__/before.json';
const afterJsonPath = '__tests__/__fixtures__/after.json';
const flatJsonTestResult = fs.readFileSync('__tests__/__fixtures__/flatJsonTest', 'utf8');

test('Flat JSON test', () => {
  expect(genDiff(beforeJsonPath, afterJsonPath))
    .toBe(flatJsonTestResult);
});
