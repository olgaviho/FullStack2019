const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      title: "Olgan Blogi",
      author: 'Olga',
      url: 'www.olganblogi.fi',
      likes: 3,
      blogs: []
    }, {
      title: "Leon Blogi",
      author: 'Leo',
      url: 'www.leonblogi.fi',
      likes: 5,
      blogs: []
    }
  ]

  const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon', author: 'nobody', likes: 2 })
    await blog.save()
    await blog.remove()
    return blog._id.toString()
  }

  const blogsInDb = async () => {
      const blogs = await Blog.find({})
      return blogs.map(blog => blog.toJSON())
  }

  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
  }

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}