const Sequelize = require('sequelize')

const seq = require('./seq')

// 创建User模型， 数据表的名字是users
const User = seq.define('user', {
  //id 会自动创建，并设为主键、自增
  userName: {
    type: Sequelize.STRING, // varchar(255)
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nickName: {
    type: Sequelize.STRING,
    comment: '昵称'  
  },
  // 自动创建 createAt 和 updateAt
})

// 创建blog模型
const Blog = seq.define('blog', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

// 关联外键
Blog.belongsTo(User, {
  // 创建外键 Blog.userId -> User.id
  foreignKey: 'userId'
})
// 和上面功能相同
User.hasMany(Blog, {
  foreignKey: 'userId'
})



module.exports = {
  User,
  Blog
}
