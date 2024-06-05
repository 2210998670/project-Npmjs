/**
 * 金额格式化
 * 100000 -> 100,000.00
 * @param {number} number
 */
export function moneyFormat(number) {
  // 将数字转换为字符串，并保留两位小数
  const formattedNumber = parseFloat(number).toFixed(2)

  // 使用正则表达式添加千位分隔符
  const parts = formattedNumber.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  // 返回格式化后的金额字符串
  return parts.join('.')
}

/**
 * 数字金额转换大写
 * 10->拾
 * @param {number} number
 */
export function moneyChinese(number) {
  const fraction = ['角', '分']
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ]

  const head = number < 0 ? '负' : ''
  number = Math.abs(number)

  let result = ''
  for (let i = 0; i < fraction.length; i++) {
    result += (digit[Math.floor(number * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
  }
  result = result || '整'

  number = Math.floor(number)

  for (let i = 0; i < unit[0].length && number > 0; i++) {
    let current = ''
    for (let j = 0; j < unit[1].length && number > 0; j++) {
      current = digit[number % 10] + unit[1][j] + current
      number = Math.floor(number / 10)
    }
    result = current.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + result
  }

  return (
    head +
    result
      .replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整')
  )
}

/**
 * 字符串格式化(%s )
 * @param {string} str  参数
 * @return {string}
 */
export function sprintf(str) {
  var args = arguments,
    flag = true,
    i = 1
  str = str.replace(/%s/g, function () {
    var arg = args[i++]
    if (typeof arg === 'undefined') {
      flag = false
      return ''
    }
    return arg
  })
  return flag ? str : ''
}

/**
 * 转换字符串
 * @param {undefined|null} str  参数
 * @return {string} undefined,null等转化为""
 */
export function parseStrEmpty(str) {
  if (!str || str == 'undefined' || str == 'null') {
    return ''
  }
  return str
}
