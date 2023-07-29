require('dotenv').config()
const Pool = require('pg').Pool;


const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.DOCKER_POSTGRES_USER,
  database: process.env.DOCKER_POSTGRES_DB,
  password: process.env.DOCKER_POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT
})

pool.on('connect', () => {
  console.log('Connected with Success')
})

module.exports = pool;
