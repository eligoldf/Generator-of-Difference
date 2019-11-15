import fs from 'fs';
import genDiff from '../src';

const flatTestResult = fs.readFileSync('__tests__/__fixtures__/flatTestResult', 'utf8');

const beforeJsonTestPath = '__tests__/__fixtures__/before.json';
const afterJsonTestPath = '__tests__/__fixtures__/after.json';

const beforeYmlTestPath = '__tests__/__fixtures__/before.yml';
const afterYmlTestPath = '__tests__/__fixtures__/after.yml';

const beforeIniTestPath = '__tests__/__fixtures__/before.ini';
const afterIniTestPath = '__tests__/__fixtures__/after.ini';

const fileType = ['json', 'yml', 'ini'];


test('JSON flat difference test', () => {
  expect(genDiff(beforeJsonTestPath, afterJsonTestPath))
    .toBe(flatTestResult);
});

test('YML flat difference test', () => {
  expect(genDiff(beforeYmlTestPath, afterYmlTestPath))
    .toBe(flatTestResult);
});

test('INI flat difference test', () => {
  expect(genDiff(beforeIniTestPath, afterIniTestPath))
    .toBe(flatTestResult);
});

test.each(fileType)('find difference between %s file types',
  (type) => {
    const beforeByFileType = `__tests__/__fixtures__/before.${type}`;
    const aftertByFileType = `__tests__/__fixtures__/after.${type}`;

    expect(genDiff(beforeByFileType, aftertByFileType))
      .toBe(flatTestResult);
  });
