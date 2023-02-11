/**
 * 用户关系 controller
 */

const { getUserByFollower, addFollower, deleteFollower, getFollowersByUser } = require("../services/user-relation")
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { addFollowerFailInfo, deleteFollowerFailInfo } = require("../model/ErrorInfo")

// 根据id获取粉丝列表
async function getFans(userId) {
  const { count, userList } =  await getUserByFollower(userId)
  
  return new SuccessModel({
    count, 
    list: userList
  })
}

// 获取关注人列表
async function getFollowers(userId) {
  const { count, userList } =  await getFollowersByUser(userId)
  
  return new SuccessModel({
    count, 
    list: userList
  })
}

/**
 * 关注
 * @param {*} myUserId 当前登录的用户id
 * @param {*} curUserId 要被关注的用户id
 */
async function follow(myUserId, curUserId) {
  try {
    await addFollower(myUserId, curUserId)
    return new SuccessModel()
  } catch (error) {
    return new ErrorModel(addFollowerFailInfo)
  }
}

/**
 * 取消
 * @param {*} myUserId 当前登录的用户id
 * @param {*} curUserId 要被关注的用户id
 */
async function unFollow(myUserId, curUserId) {
  const result = await deleteFollower(myUserId, curUserId)
  if(result) {
    return new SuccessModel()
  }
  return new ErrorModel(deleteFollowerFailInfo)
}

module.exports = {
  getFans,
  getFollowers,
  follow,
  unFollow
}