const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    const saltRounds = 11

    if (!body.password){
      return response.status(400).send({ error: 'Missing password' })
    } else if (body.password.length < 3) {
      return response.status(400).send({ error: 'Password is too short' })
    }

    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()
    response.json(savedUser)

  } catch (exeption) {
    next(exeption)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', {title: 1, author: 1, url: 1})
  response.json(users.map(u => u.toJSON()))
})

usersRouter.get('/:id', async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id)
    if (user) {
      response.json(user.toJSON())
    } else {
      response.status(404).end()
    }
  } catch (exeption) {
    next(exeption)
  }
})

module.exports = usersRouter