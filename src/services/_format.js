/**
 * @description 数据格式化
 */

const { DEFAULT_PICTURE } = require('../conf/constant')

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
    return
  } 
  if(list instanceof Array) {
    return list.map(_formatUserPicture)
  }

  return _formatUserPicture(list) 
}

module.exports = {
  formatUser
}
