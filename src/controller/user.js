/**
 * @description user controller
 */
const { getUserInfo, createUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo, registerUserNameExistInfo } = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')

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

// 注册
async function register({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName)
  if(userInfo) {
    // 用户名已存在
    return new ErrorModel(registerUserNameExistInfo)
  }

  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel()
  } catch (error) {
    console.error(error.message, error.stack)
    return new ErrorModel(registerFailInfo)
  }
}

module.exports = {
  isExist,
  register
}