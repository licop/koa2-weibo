/**
 * @description user services
 */

const { User } = require('../db/model/index')
const { addFollower } = require('./user-relation')
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
  const data = result.dataValues

  // 自己关注自己（方便首页获取数据）
  addFollower(data.id, data.id)
  
  return data
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

// 更新用户
async function updateUser(
  { newPassword, newNickName, newPicture, newCity },
  { userName, password }
) {
  // 拼接修改内容
  const updateData = {}
  if (newPassword) {
    updateData.password = newPassword
  }
  if (newNickName) {
    updateData.nickName = newNickName
  }
  if (newPicture) {
    updateData.picture = newPicture
  }
  if (newCity) {
    updateData.city = newCity
  }

  // 拼接查询条件
  const whereData = {
    userName
  }
  if (password) {
    whereData.password = password
  }

  // 执行修改
  const result = await User.update(updateData, {
    where: whereData
  })
  
  return result[0] > 0 // 修改的行数
}


module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser
}
