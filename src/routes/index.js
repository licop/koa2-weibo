const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 index',
  }
})

router.get('/json', async (ctx, next) => {
  throw Error()
  const session = ctx.session
  if(session.viewNum == null) {
    session.viewNum = 0
  } 
  session.viewNum++

  ctx.body = {
    title: 'koa2 json',
    viewNum: session.viewNum
  }
})

router.get('/profile/:userName', async (ctx, next) => {
  const { userName } = ctx.params
  ctx.body = {
    title: 'this is profile page',
    userName
  }
})

module.exports = router
