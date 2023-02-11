/**
 * 个人主页api路由
 */

const router = require('koa-router')()
const { getProfileBlogList } = require('../../controller/blog-profile')
const { loginCheck } = require('../../middlewares/loginChecks')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/profile')

// 加载更多
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
  let { userName, pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)

  const result = await getProfileBlogList(userName, pageIndex)
  
  // 渲染为html字符串
  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})

module.exports = router