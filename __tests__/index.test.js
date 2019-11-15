import fs from 'fs';
import genDiff from '../src';

const beforeJsonTestPath = '__tests__/__fixtures__/before.json';
const afterJsonTestPath = '__tests__/__fixtures__/after.json';
const beforeYmlTestPath = '__tests__/__fixtures__/before.yml';
const afterYmlTestPath = '__tests__/__fixtures__/after.yml';
const flatTestResult = fs.readFileSync('__tests__/__fixtures__/flatTestResult', 'utf8');


test('JSON difference test', () => {
  expect(genDiff(beforeJsonTestPath, afterJsonTestPath))
    .toBe(flatTestResult);
});

test('YML difference test', () => {
  expect(genDiff(beforeYmlTestPath, afterYmlTestPath))
    .toBe(flatTestResult);
});
