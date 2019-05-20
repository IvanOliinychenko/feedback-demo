// require config for independent from app migrations

const env = process.env.NODE_ENV || 'production'
const config = require(`./config.${ env === 'dev' ? 'dev' : 'prod' }.json`)

module.exports = config.db