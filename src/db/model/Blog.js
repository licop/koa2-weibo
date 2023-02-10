/**
 * @description 微博数据模型
 */

const seq = require('../seq')
const {INTEGER, STRING, TEXT} = require('../types')

// users
const Blog = seq.define('blog', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: '微博内容'
  },
  image: {
    type: STRING,
    comment: '用户id'
  },
})

module.exports = Blog