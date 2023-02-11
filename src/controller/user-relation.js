/**
 * 用户关系 controller
 */

const { getUserByFollower } = require("../services/user-relation")
const { SuccessModel, ErrorModel } = require('../model/ResModel')

// 根据id获取粉丝列表
async function getFans(userId) {
  const { count, userList } =  await getUserByFollower(userId)
  
  return new SuccessModel({
    count, 
    list: userList
  })
}

module.exports = {
  getFans
}