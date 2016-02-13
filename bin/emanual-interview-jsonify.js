#!/usr/bin/env node

'use strict'
const program = require('commander')
const fs = require('fs')
const path = require('path')
const parser = require('../')
// const glob = require('glob')

program
  .arguments('<src...> ')
  .description('md -> json')
  .option('-o, --output [output]', 'the output file, default:summary.json', './')
  .action(function (src, options) {
    if(!src){
      console.log('require `src`')
      return
    }
	  // console.log(src)
    let dest = options.output || './'
    if(!fs.existsSync(dest)){
      fs.mkdirSync(dest)	  
    }
    // let files = glob.sync()
    src.forEach(function(file){
      // let dirname = path.dirname(file)
      let basename = path.basename(file)
      let extname = path.extname(file)
      let content = fs.readFileSync(file, {encoding: 'utf-8'})
      let result = parser(content)
      let newFileName = path.join(dest, basename.replace(extname, '')+'.json');
      // console.log(newFileName)
      fs.writeFileSync(newFileName, JSON.stringify(result, null, 4), {encoding: 'utf-8'})
    })
    
  })
  .parse(process.argv)
