#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';

program
  .version('4.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .action((path1, path2) => {
    const diff = genDiff(path1, path2, program.format);
    console.log(diff);
  })
  .parse(process.argv);
