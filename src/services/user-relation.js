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

// 获取关注人列表
async function getFollowersByUser(userId) {
  const result = await UserRelation.findAndCountAll({
    order: [
      ["id", "desc"]
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'picture', 'userName', 'nickName'],
      }
    ],
    where: {
      userId
    }
  })

  let userList = result.rows.map(row => row.dataValues)
  
  userList = userList.map(item => {
    let user = item.user.dataValues
    return formatUser(user)
  })
  
  return {
    count: result.count,
    userList
  }
}

/**
 * 添加关注关系
 * @param {*} userId 
 * @param {*} followerId 
 */
async function addFollower(userId, followerId) {
  const result = await UserRelation.create({
    userId,
    followerId
  })
  
  return result.dataValues
}

/**
 * 删除关注关系
 * @param {*} userId 
 * @param {*} followerId 
 */
async function deleteFollower(userId, followerId) {
  const result = await UserRelation.destroy({
    where: {
      userId,
      followerId
    }
  })
  
  return result > 0
}

module.exports = {
  getUserByFollower,
  getFollowersByUser,
  addFollower,
  deleteFollower
}
