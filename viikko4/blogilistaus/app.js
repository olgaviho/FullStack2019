const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

const morgan = require('morgan')
const morganLogger = morgan('tiny')

logger.info('connecting to', config.url)

mongoose.connect(config.url, { useNewUrlParser: true })
    .then(() => {
        logger.info('connected to Mongo')
    })
    .catch((error) => {
        logger.error('error connection to Mongo: ', error.message)
    })

app.use(cors())
app.use(bodyParser.json())

app.use(morganLogger)
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

