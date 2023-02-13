/**
 * 微博 view 路由
 */

const router = require('koa-router')()
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { loginRedirect } = require('../../middlewares/loginChecks')
const { isExist } = require('../../controller/user') 
const { getFans, getFollowers } = require('../../controller/user-relation')
const { getHomeBlogList } = require('../../controller/blog-home')
const { getAtMeCount, getAtMeBlogList, markAsRead } = require('../../controller/blog-at')

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
  const userInfo = ctx.session.userInfo
  const { id: userId } = userInfo

  // 获取第一页数据
  const result = await getHomeBlogList(userId)
  
  // 获取粉丝
  const fansResult = await getFans(userId)
  
  // 获取关注人列表
  const followersResult = await getFollowers(userId)

  // 获取@数量
  const atCountResult = await getAtMeCount(userId)
  const { count: atCount } = atCountResult.data
  console.log(atCount, 31)

  await ctx.render('index', {
    userData: {
      userInfo,
      fansData: {
        ...fansResult.data
      },
      followersData: {
        ...followersResult.data
      },
      atCount
    },
    blogData: {
      ...result.data
    }
    
  })

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
  // 获取关注人列表
  const followersResult = await getFollowers(curUserInfo.id)

  // 我是否关注了此人
  const amIFollowed = fansResult.data.list.some(item => {
    return item.userName == myUserName
  })

  // 获取@数量
  const atCountResult = await getAtMeCount(curUserInfo.id)
  const { count: atCount } = atCountResult.data

  await ctx.render('profile', {
    blogData: {
      ...result.data
    },
    userData: {
      userInfo: curUserInfo,
      isMe,
      fansData: {
        ...fansResult.data
      },
      amIFollowed,
      followersData: {
        ...followersResult.data
      },
      atCount
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

// atMe 路由
router.get('/at-me', loginRedirect, async (ctx, next) => {
  const { id: userId } = ctx.session.userInfo

  // 获取 @ 数量
  const atCountResult = await getAtMeCount(userId)
  const { count: atCount } = atCountResult.data

  // 获取第一页列表
  const result = await getAtMeBlogList(userId)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

  // 渲染页面
  await ctx.render('atMe', {
    atCount,
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    }
  })

  // 标记为已读
  if (atCount > 0) {
    await markAsRead(userId)
  }
})

module.exports = router

