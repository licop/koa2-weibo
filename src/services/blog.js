/**
 * blog service
 */
const { Blog, User, UserRelation } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')

// 创建微博
async function createBlog({ userId, content, image }) {
  const result = await Blog.create({
    userId,
    content,
    image
  })
  return result.dataValues
}

// 根据用户获取微博列表
async function getBlogListByUser({ userName, pageIndex = 0, pageSize = 10 }) {
  const userWhereOpts = {}

  if(userName) {
    userWhereOpts.userName = userName
  }

  // 执行查询
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: userWhereOpts
      }
    ]
  })

  // result.count 总数， 跟分页无关
  // result.rows 查询结果，数组
  let blogList = result.rows.map(row => row.dataValues)
  
  // 格式化
  blogList = formatBlog(blogList)
  blogList = blogList.map(blogItem => {
    const user = blogItem.user.dataValues
    blogItem.user = formatUser(user)
    
    return blogItem
  })

  return {
    count: result.count,
    blogList
  }

}

// 获取关注者的微博列表
async function getFollowersBlogList({userId, pageIndex, pageSize = 10}) {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageIndex * pageSize,
    order: [
      ["id", "desc"]
    ],
    include: [
      {
        model: User,
        attributes: ["userName", "nickName", "picture"]
      },
      {
        model: UserRelation,
        attributes: ["userId", "followerId"],
        where: { userId }
      }
    ]
  })

  let blogList = result.rows.map(row => row.dataValues)

  // 格式化
  blogList = formatBlog(blogList)
  blogList = blogList.map(blogItem => {
    const user = blogItem.user.dataValues
    blogItem.user = formatUser(user)
    
    return blogItem
  })
  
  return {
    count: result.count,
    blogList
  }

}

module.exports = {
  createBlog,
  getBlogListByUser,
  getFollowersBlogList
}