const { User, Blog } = require('./model')

!(async function() {
  // 删除一条博客
  // const delRes = await Blog.destroy({
  //   where: {
  //     id: 4
  //   }
  // })
   // 删除一条用户
   const delRes1 = await User.destroy({
    where: {
      id: 1
    }
  })
})()