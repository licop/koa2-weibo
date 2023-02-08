/**
 * @description user services
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')
/**
 * 获取用户信息
 * @param {*} userName 
 * @param {*} password 
 */
async function getUserInfo(userName, password) {
  // 查询条件
  const opt = {
    userName
  }

  if(password) {
    Object.assign(opt, { password })
  }
  
  // 查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: opt
  })

  if(result === null) {
    // 未找到
    return result
  }

  // 格式化
  const formatRes = formatUser(result.dataValues)
  return formatRes
}

// 创建用户
async function createUser({userName, password, gender = 3, nickName}) {
  const result = await User.create({
    userName,
    password,
    gender,
    nickName: nickName ? nickName : userName
  })

  return result.dataValues
}

// 删除用户
async function deleteUser(userName) {
  const result = await User.destroy({
    where: {
      userName
    }
  })
  // result 删除行数
  return result > 0
} 

module.exports = {
  getUserInfo,
  createUser,
  deleteUser
}
