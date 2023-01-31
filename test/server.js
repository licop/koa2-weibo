/**
 * @description jest server
 */

const request = require('supertest')
const server = request('../src/app').callback()

module.exports = request(server)
