import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFixture = (file) => readFileSync(getFixturePath(file), 'utf8');

const stylishResult1 = readFixture('expected1.txt');
const plainResult1 = readFixture('expectedPlain1.txt');
const jsonResult1 = readFixture('expectedJson1.txt');

const stylishResult = readFixture('expected.txt');
const plainResult = readFixture('expectedPlain.txt');
const jsonResult = readFixture('expectedJson.txt');

describe('Gendiff_test1', () => {
  test.each(['json', 'yml'])('calculate differences', (extenshion) => {
    const filepath1 = getFixturePath(`file3.${extenshion}`);
    const filepath2 = getFixturePath(`file4.${extenshion}`);

    expect(genDiff(filepath1, filepath2)).toEqual(stylishResult1);
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(stylishResult1);
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(plainResult1);
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(jsonResult1);
  });
});

describe('Gendiff_test2', () => {
  test.each(['json', 'yml'])('calculate differences', (extenshion) => {
    const filepath1 = getFixturePath(`file1.${extenshion}`);
    const filepath2 = getFixturePath(`file2.${extenshion}`);

    expect(genDiff(filepath1, filepath2)).toEqual(stylishResult);
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(stylishResult);
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(plainResult);
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(jsonResult);
  });
});
