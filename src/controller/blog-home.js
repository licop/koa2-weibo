const xss = require('xss')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlog, getFollowersBlogList } = require('../services/blog')
const { PAGE_SIZE } = require('../conf/constant')


// 创建微博
async function create({ userId, content, image }) {
  try {
    const blog = await createBlog({
      userId, 
      content: xss(content), 
      image
    })
    return new SuccessModel(blog)
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

// 获取首页微博列表
async function getHomeBlogList(userId, pageIndex = 0) {
  const result = await getFollowersBlogList({userId, pageIndex, pageSize: PAGE_SIZE})

  const blogList = result.blogList
  
  // 拼接返回数据
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count
  })
}

module.exports = {
  create,
  getHomeBlogList
}