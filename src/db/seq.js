// 连接数据库
const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')

const { host, password, user, database } = MYSQL_CONF

const conf = {
  host,
  dialect: 'mysql'
}

// 线上用连接池
// conf.pool = {
//   max: 5, // 连接池中最大的连接数
//   min: 0,
//   idle: 1000, // 如果一些连接池10s之内没有被使用则释放
// }

const seq = new Sequelize(database, user, password, conf)

module.exports = seq


