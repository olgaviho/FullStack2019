const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})


blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
    response.json(savedBlog.toJSON())
  } catch (exeption) {
    next(exeption)
  }
})


blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch (exeption) {
    next(exeption)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {

      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    console.log(blog.user.toString())
    console.log(user.id.toString())

    if (blog.user.toString() === user.id.toString()) {
      response.status(204).end()
    } else {
      return response.status(401).json({ error: 'wrong user' })
    }

  } catch (exeption) {
    next(exeption)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      blog.likes = body.likes
      const savedBlog = await blog.save()
      response.json(savedBlog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch (exeption) {
    next(exeption)
  }
})


module.exports = blogsRouter