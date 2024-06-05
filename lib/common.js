/**
 * 通用js方法封装处理
 */

/**
 * 回显数据字典
 * @param {object} datas 标签和值对应关系的对象
 * @param {string} value 要匹配的数值
 * @return {string} actions 查询到的数据，为查询到返回匹配数值
 */
export function selectDictLabel(datas, value) {
  if (value === undefined) {
    return ''
  }
  var actions = []
  Object.keys(datas).some(key => {
    if (datas[key].value == '' + value) {
      actions.push(datas[key].label)
      return true
    }
  })
  if (actions.length === 0) {
    actions.push(value)
  }
  return actions.join('')
}
 
/**
 * 回显数据字典（字符串数组）给定的值（或值的集合）在数据对象中查找对应的标签
 * @param {object} datas 标签和值对应关系的对象
 * @param {string} value 要匹配的数值，可以多个值
 * @param {string} separator 可选参数，用于指定多个值之间的分隔符，默认为逗号,
 * @return {string} actions 查找对应的标签，以逗号连接起来返回。
 */
export function selectDictLabels(datas, value, separator) {
  if (value === undefined) {
    return ''
  }
  var actions = []
  var currentSeparator = undefined === separator ? ',' : separator
  var temp = value.split(currentSeparator)
  Object.keys(value.split(currentSeparator)).some(val => {
    var match = false
    Object.keys(datas).some(key => {
      if (datas[key].value == '' + temp[val]) {
        actions.push(datas[key].label + currentSeparator)
        match = true
      }
    })
    if (!match) {
      actions.push(temp[val] + currentSeparator)
    }
  })
  return actions.join('').substring(0, actions.join('').length - 1)
}

// 
/**
 * 数据合并 两个对象进行递归合并
 * @param {object} source 源对象，合并操作将会修改这个对象。
 * @param {object} target 目标对象，其中的属性值将会合并到源对象中。
 * @return {object} source 新对象，如果同一级有相同熟悉会以目标对象值为基准
 */
export function mergeRecursive(source, target) {
  for (var p in target) {
    try {
      if (target[p].constructor == Object) {
        source[p] = mergeRecursive(source[p], target[p])
      } else {
        source[p] = target[p]
      }
    } catch (e) {
      source[p] = target[p]
    }
  }
  return source
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源 包含父子关系的扁平数据。
 * @param {*} id 可选参数 唯一标识id字段 默认 'id'
 * @param {*} parentId 可选参数 父节点字段 默认 'parentId'
 * @param {*} children 可选参数 孩子节点字段 默认 'children'
 * @return {object} result 返回转换后的树形结构数据。
 */
export function handleTree(data, id, parentId, children) {
  let config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children'
  }

  var childrenListMap = {}
  var nodeIds = {}
  var tree = []

  for (let d of data) {
    let parentId = d[config.parentId]
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = []
    }
    nodeIds[d[config.id]] = d
    childrenListMap[parentId].push(d)
  }

  for (let d of data) {
    let parentId = d[config.parentId]
    if (nodeIds[parentId] == null) {
      tree.push(d)
    }
  }

  for (let t of tree) {
    adaptToChildrenList(t)
  }

  function adaptToChildrenList(o) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]]
    }
    if (o[config.childrenList]) {
      for (let c of o[config.childrenList]) {
        adaptToChildrenList(c)
      }
    }
  }
  return tree
}

/**
 * 参数处理 传入的参数对象转换为 URL 查询字符串的形式
 * @param {*} params  参数
 * @return {*} result 构建好的 URL 查询字符串
 */
export function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    var part = encodeURIComponent(propName) + '='
    if (value !== null && value !== '' && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== '' && typeof value[key] !== 'undefined') {
            let params = propName + '[' + key + ']'
            var subPart = encodeURIComponent(params) + '='
            result += subPart + encodeURIComponent(value[key]) + '&'
          }
        }
      } else {
        result += part + encodeURIComponent(value) + '&'
      }
    }
  }
  return result
}
