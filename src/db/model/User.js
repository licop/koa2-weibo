/**
 * @description 用户数据模型
 */

const seq = require('../seq')
const {STRING, DECIMAL} = require('../types')

// users
const User = seq.define('user', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '用户名，唯一'
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码'
  },
  nickName: {
    type: STRING,
    allowNull: false,
    comment: '昵称'
  },
  gender: {
    type: DECIMAL,
    defaultValue: 3,
    comment: '性别(1 男、2 女、3 保密)'
  },
  picture: {
    type: STRING,
    unique: true,
    comment: '头像图片地址'
  },
  city: {
    type: STRING,
    comment: '城市'
  }
})

module.exports = User