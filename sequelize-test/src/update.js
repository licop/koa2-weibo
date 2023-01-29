const { User } = require('./model')

!(async function() {
  const updateRes = await User.update({
    nickName: '张三一'
  }, {
    where: {
      userName: 'zhangsan'
    }
  })
})()