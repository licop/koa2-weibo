// 连接数据库
const Sequelize = require('sequelize')
const { isProd, isTest } = require('../util/env')

const conf = {
  host: 'localhost',
  dialect: 'mysql'
}

if(isTest) {
  conf.logging = () => {}
}

// 线上用连接池
// conf.pool = {
//   max: 5, // 连接池中最大的连接数
//   min: 0,
//   idle: 1000, // 如果一些连接池10s之内没有被使用则释放
// }

const seq = new Sequelize('koa2_weibo_db', 'root', '_chuang1314', conf)


module.exports = seq


