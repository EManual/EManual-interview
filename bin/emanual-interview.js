#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')

program
  .version(pkg.version)
  .command('jsonify <src> [dest]', 'cover xx.md to json')
  .parse(process.argv);
  
/**
 * 
 * 
 * xxx jsonfy *.glob.md ./
 */
