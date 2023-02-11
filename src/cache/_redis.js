/**
 * @description 连接redis的方法 get set
 */

const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)



// 连接数据库
!(async function() {
  await redisClient.connect()
    .then(() => console.log('redis connect success!'))
    .catch(console.error)
})()


/**
 * redis set
 * @param {string} key 
 * @param {string} val 
 * @param {number} timeout 过期时间， 单位 s
 */
async function set(key, val, timeout = 60 * 60) {
  if(typeof val === 'object') {
    val = JSON.stringify(val)
  }
  await redisClient.set(key, val)
  await redisClient.expire(key, timeout)
}

/**
 * redis get
 * @param {string} key 
 */
async function get(key) {
  try {
    let val = await redisClient.get(key)

    if(val == null) return val
    
    try {
      val = JSON.parse(val) // 尝试转换js对象
    } catch (err) { }

    return val
    
  } catch (err) {
    throw(err)
  }
}

module.exports = {
  set,
  get
}

