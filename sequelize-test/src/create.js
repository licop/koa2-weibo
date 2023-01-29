
const { Blog, User } = require('./model') 

!(async function() {
  // 创建用户
  const zhangsan = await User.create({
    userName: 'zhangsan',
    password: '123',
    nickName: '张三'
  })
  // insert into users(...) value(...) 
  console.log('zhangsan', zhangsan.dataValues)
  const zhangsanId = zhangsan.dataValues.id
  
  const lisi = await User.create({
    userName: 'lisi',
    password: '123',
    nickName: '李四'
  })

  const lisiId = lisi.dataValues.id
  
  // 创建博客
  const blog1 = await Blog.create({
    title: '标题一',
    content: '内容一',
    userId: zhangsanId
  })
  console.log('blog1', blog1.dataValues)


  const blog2 = await Blog.create({
    title: '标题2',
    content: '内容2',
    userId: lisiId
  })

  const blog3 = await Blog.create({
    title: '标题',
    content: '内容3',
    userId: zhangsanId
  })

  const blog4 = await Blog.create({
    title: '标4',
    content: '内容4',
    userId: lisiId
  })
})()