if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

let url = process.env.MONGODB_URL
let port = process.env.PORT

if (process.env.NODE_ENV === 'test') {
  url = process.env.TEST_MONGODB_URL
}

module.exports = {
  url,
  port,
}