/**
 * 微博 view 路由
 */

const router = require('koa-router')()
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { loginRedirect } = require('../../middlewares/loginChecks')
const { isExist } = require('../../controller/user') 
const { getFans } = require('../../controller/user-relation')

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {})
})

// 个人主页
router.get('/profile/', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo
  ctx.redirect(`/profile/${userName}`)
})

router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  // 已登录用户信息
  const myUserInfo = ctx.session.userInfo
  const myUserName = myUserInfo.userName
  
  let curUserInfo
  const { userName: curUserName} = ctx.params
  const isMe = myUserName === curUserName
  if(isMe) {
    curUserInfo = myUserInfo
  } else {
    const existResult = await isExist(curUserName)
    if(existResult.errno !== 0) {
      return 
    }
    curUserInfo = existResult.data
  }
  
  // 获取微博第一页数据
  const result = await getProfileBlogList(curUserName, 0)

  // 获取粉丝
  const fansResult = await getFans(curUserInfo.id)

  await ctx.render('profile', {
    blogData: {
      ...result.data
    },
    userData: {
      userInfo: curUserInfo,
      isMe,
      fansData: {
        ...fansResult.data
      }
    }
  })
})

// 广场页面的路由
router.get('/square', loginRedirect, async (ctx, next) => {
  // 获取微博第一页数据
  const result = await getSquareBlogList(0)
  
  await ctx.render('square', {
    blogData: {
      ...result.data
    }
  })
})


module.exports = router

