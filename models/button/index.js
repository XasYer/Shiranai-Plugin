import { Render, Version } from '#components'
import { segment, Bot } from '#lib'

/**
 * 转换成Button
 * @param {Array<Array<button>} buttons
 * @param {string} adapterName 对应平台的适配器名称
 * @param {{ defRetType: 'image'|'text'; }} cfg 其他配置
 *
 * @typedef {Object} button
 * @property {string} text 显示值
 * @property {string?} callback 回调
 * @property {string?} input 输入
 * @property {Boolean?} send 直接发送
 * @property {string|Array<string>|undefined} permission 有权限点击的用户
 * @property {Object?} QQBot 其他参数
 *
 * @returns {Object} segment处理后的按钮
 */
function toButton (buttons, adapterName, cfg = { defRetType: 'image' }) {
  switch (adapterName) {
    case 'QQBot':
    case 'QQGuild':
      switch (Version.BotName) {
        case 'Karin':
          return segment.text('')
        case 'Trss-Yunzai':
          return segment.button(...buttons)
        case 'Miao-Yunzai':
          return Bot.Button(buttons)
        default:
          return ''
      }
    case false:
    case undefined:
    case null:
    case '':
      return ''
    default:
      switch (cfg.defRetType) {
        case 'image':
          return Render.simpleRender('buttonTemplate/index', { buttons })
        case 'text':
          return '\n可选指令:\n' + buttons.map(button => button.map(i => (`「${i.callback || i.input}」`)).join('')).join('\n')
      }
  }
}

/**
 * 将A1 2b形式的坐标转换成数组形式
 * @param {string} inputString 坐标
 * @returns {Array<number>}
 */
function extLetterToNumber (inputString) {
  const alphaPattern = /[a-zA-Z]+/
  const numericPattern = /\d+/

  const letter = inputString.match(alphaPattern)
  const number = inputString.match(numericPattern)

  return (letter && number) ? [letterToNumber(letter[0].toUpperCase()), parseInt(number[0])] : []
}

function letterToNumber (letters) {
  let result = 0
  const length = letters.length

  for (let i = 0; i < length; i++) {
    result *= 26
    result += letters.charCodeAt(i) - 'A'.charCodeAt(0) + 1
  }

  return result
}

/**
 * 将数组形式的坐标转换成A1形式
 * @param {string} inputString 坐标
 * @returns {Array<number>}
 */
function restoreNumberToLetter (array) {
  const letter = numberToLetter(array[0] - 1).toUpperCase()
  const number = array[1]
  return `${letter}${number}`
}

function numberToLetter (num) {
  let letter = ''
  while (num >= 0) {
    letter = String.fromCharCode((num % 26) + 65) + letter
    num = Math.floor(num / 26) - 1
  }
  return letter
}

/**
 * 将坐标转换成序号
 * @param {number} row 行
 * @param {number} column 列
 * @param {number} numberOfColumns 每行个数
 * @returns {number}
 */
function coordinateToIndex (row, column, numberOfColumns = 10) {
  return (row - 1) * numberOfColumns + (column - 1)
}

export {
  toButton,
  extLetterToNumber,
  restoreNumberToLetter,
  coordinateToIndex
}
