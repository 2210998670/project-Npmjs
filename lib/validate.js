/**
 * 是否为外部链接，例如以 http://、https://、mailto: 或 tel: 开头的链接
 * @param {string} path
 * @returns {Boolean} Boolean
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 验证用户名是否为指定的值，例如只允许 'admin' 或 'editor'
 * @param {string} str
 * @returns {Boolean} Boolean
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * 验证 URL 是否符合标准的网址格式，包括协议、域名和路径等部分
 * @param {string} url
 * @returns {Boolean} Boolean
 */
export function validURL(url) {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * 验证字符串是否只包含小写字母
 * @param {string} str
 * @returns {Boolean} Boolean
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * 验证字符串是否只包含大写字母
 * @param {string} str
 * @returns {Boolean} Boolean
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * 验证字符串是否只包含大小写字母
 * @param {string} str
 * @returns {Boolean} Boolean
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * 验证邮箱地址是否符合标准的电子邮件格式
 * @param {string} email
 * @returns {Boolean} Boolean
 */
export function validEmail(email) {
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * 验证输入是否为字符串类型
 * @param {string} str
 * @returns {Boolean} Boolean
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * 验证输入是否为数组类型
 * @param {Array} arg
 * @returns {Boolean} Boolean
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * 验证数据是否为 JSON 格式
 * @param {string} str
 * @returns {Boolean} Boolean
 */
export function isJSON(str) {
  try {
    JSON.parse(str)
    return true
  } catch (e) {
    return false
  }
}

/**
 * 验证是否为blob格式
 * @param {*} params  参数
 * @return {boolean} boolean
 */
export async function blobValidate(data) {
  try {
    const text = await data.text()
    JSON.parse(text)
    return false
  } catch (error) {
    return true
  }
}


