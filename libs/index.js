'use strict'

/**
 * 解析key-value头信息
 * @param {Array} lines lines of the content
 */
function parser_setting (lines) {
  var setting = {}
  for (let i = 0;i < lines.length; i++) {
    if (lines[i].startsWith('-')) {
      let tmp = lines[i].substring(lines[i].indexOf('-') + 1, lines[i].length)
      setting[tmp.split(':')[0].trim().toLowerCase()] = tmp.split(':')[1].trim().toLowerCase()
    }
  }
  return setting
}
/**
 * 解析description部分
 * @param {Array} lines lines of the content
 */
function parser_descriptionBody (lines) {
  for (let index = 0;index < lines.length;index++) {
    if (lines[index].startsWith('A、')) {
      return {
        description: subArray(lines, 0, index - 1).join('\n'),
        options: parse_option(subArray(lines, index, lines.length))
      }
    }
  }
  return {
    description: lines.join('\n').trim(),
    options: []
  }
}

function parse_option (lines) {
  let options = []
  let tmpOptionLines = []
  for (let index = 0; index < lines.length;index++) {
    if (/\w、/.test(lines[index])) {
      if ('' !== tmpOptionLines.join('\n').trim()) {
        options.push(tmpOptionLines.join('\n').trim())
        tmpOptionLines = []
      }
    }
    tmpOptionLines.push(lines[index])
  }
  if ('' !== tmpOptionLines.join('\n').trim()) {
    options.push(tmpOptionLines.join('\n').trim())
    tmpOptionLines = []
  }
  // console.log('options')
  // console.log(options)
  return options
}

/**
 * 解析答案
 * @param {Array} lines lines of the content
 */
function parser_answer (lines) {
  return lines.join('\n').trim()
}
/**
 * 获取字符串的
 * @param {Array} arr 数组
 * @param {int} start the start index since 0
 * @param {int} end the end index 
 */
function subArray (arr, start, end) {
  let res = []
  for (let i = start; i <= end; i++) {
    res.push(arr[i])
  }
  return res
}

/**
 * parser main()
 * @param {string} content 
 */
function parser (content) {
  let lines = content.split('\n')
  let question = {
    type: 'reply',
    tag: '',
    difficulty: '1',
    from: '',
    description: '',
    answer: ''
  }
  let start = 0
  let end = 0

  // setting
  while(!lines[end].startsWith('---')){
    end++
  }
  let setting = parser_setting(subArray(lines, start, end - 1))
  question.type = setting.type || ''
  question.tag = setting.tag || ''
  question.difficulty = setting.difficulty || ''
  question.from = setting.from || ''
  end++, start = end

  // description
  while(!lines[end].startsWith('---')){
    end++
  }
  let descriptionBody = parser_descriptionBody(subArray(lines, start, end - 1)) 
  question.description = descriptionBody.description
  question.options = descriptionBody.options
  question.answer = parser_answer(subArray(lines, end + 1, lines.length))
  // console.log(question)
  return question
}

module.exports = parser
