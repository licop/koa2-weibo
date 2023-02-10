/**
 * @description 数据模型入口文件
 */

const User = require('./User')
const Blog = require('./Blog')

// 创建外键, 查询微博的时候带出用户
Blog.belongsTo(User, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog
}
