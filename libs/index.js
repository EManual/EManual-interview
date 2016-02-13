'use strict'

function parser_setting (lines) {
  var setting = {}
  for (let i = 0;i < lines.length; i++) {
    if (lines[i].startsWith('-')) {
      let tmp = lines[i].substring(lines[i].indexOf('-') + 1, lines[i].length)
      setting[tmp.split(':')[0].trim()] = tmp.split(':')[1].trim()

    }
  }
  return setting
}

function parser_description (lines) {
  return lines.join('\n').trim()
}

function parser_answer (lines) {
  return lines.join('\n').trim()
}

function subArray (arr, start, end) {
  let res = []
  for (let i = start; i <= end; i++) {
    res.push(arr[i])
  }
  return res
}

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
  question.description = parser_description(subArray(lines, start, end - 1))
  question.answer = parser_answer(subArray(lines, end + 1, lines.length))

  return question
}

module.exports = parser
