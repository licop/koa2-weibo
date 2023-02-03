/**
 * @description user controller
 */
const { getUserInfo } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameExistInfo } = require('../model/ErrorInfo')

// 用户名是否存在
async function isExist(userName) {
  const userInfo = await getUserInfo(userName)
  if(userInfo) {
    // { errno: 0, data{} }
    return new SuccessModel(userInfo)
  } else {
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

module.exports = {
  isExist
}