/**
 * 用户关系
 */
const { UserRelation, User } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')


// 获取关注该用户的用户列表
async function getUserByFollower(followerId) {
  const result = await User.findAndCountAll({
    attributes: ['id', 'picture', 'userName', 'nickName'],
    order: [
      ["id", "desc"]
    ],
    include: [
      {
        model: UserRelation,
        where: {
          followerId
        }
      }
    ]
  })

  let userList = formatUser(result.rows.map(row => row.dataValues))

  return {
    count: result.count,
    userList
  }
  
}

module.exports = {
  getUserByFollower
}
