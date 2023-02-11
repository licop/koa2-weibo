/**
 * @description 数据格式化
 */

const { DEFAULT_PICTURE } = require('../conf/constant')
const { timeFormat } = require('../utils/dt')

function _formatUserPicture(obj) {
  if(obj.picture === null) {
    obj.picture = DEFAULT_PICTURE
  }

  return obj
}


/**
 * 格式化用户信息
 * @param {*} list 用户列表或单个用户信息
 */
function formatUser(list) {
  if(list === null) {
    return list
  } 
  if(list instanceof Array) {
    return list.map(_formatUserPicture)
  }

  return _formatUserPicture(list) 
}

// 格式化数据的时间
function _formatDBTime(obj) {
  obj.createdAt = timeFormat(obj.createdAt)
  obj.updatedAt = timeFormat(obj.updatedAt)
  
  return obj
}

/**
 * 格式化微博信息 
 */
function formatBlog(list) {
  if(list === null) {
    return list
  } 

  if(list instanceof Array) {
    return list.map(_formatDBTime)
  }

  return _formatDBTime(obj)
}

module.exports = {
  formatUser,
  formatBlog
}
