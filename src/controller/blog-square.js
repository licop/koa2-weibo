/**
 * @description 广场页面 controller
 */

const { PAGE_SIZE } = require("../conf/constant")
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { getSquareCacheList } = require("../cache/blog")

// 获取广场页微博列表
async function getSquareBlogList(pageIndex = 0) {
  // 从redis缓存中获取数据
  const result = await getSquareCacheList(pageIndex, PAGE_SIZE)

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
  getSquareBlogList
}
