const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../index.js')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeAll(async () => {
  await Blog.remove({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('basic', async () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('blogs are json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('id is id, not _id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const firstBlogId = blogsAtStart[0].id

    expect(firstBlogId).toBeDefined()
  })
})


describe('edit blog', async () => {
  test('it is possible to edit likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const editedBlogId = blogsAtStart[0].id
    const newLikes = {
      likes: 50
    }
    await api
      .put(`/api/blogs/${editedBlogId}`)
      .send(newLikes)
      .expect(200)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)

    const likes = blogsAtEnd.map(b => b.likes)
    expect(likes).toEqual([50, 5])
  })
})

describe('add blogs', async () => {
  test('blog without likes gets zero likes', async () => {
    const BlogsAtStart = await helper.blogsInDb()
    const newBlog = {
      title: 'Olgan neljas blogi',
      author: 'Olga',
      url: 'www.olganneljasblogi.fi'
    }
    await api
      .post('/api/blogs')
      .set('Accept', 'application/json')
      .send(newBlog)
      .expect(200)
    const BlogsAtEnd = await helper.blogsInDb()
    expect(BlogsAtEnd.length).toBe(BlogsAtStart.length + 1)

    const likes = BlogsAtEnd.map(b => b.likes)
    expect(likes).toEqual([50, 5, 0])
  })

  test('a valid blog can be added', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = {
      title: 'Olgan toinen blogi',
      author: 'Olga',
      url: 'www.pipapo.fi',
      likes: 2
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(b => b.title)
    expect(blogsAtEnd.length).toBe(blogsAtStart.length + 1)
    expect(titles).toContain(
      'Olgan toinen blogi'
    )
  })

  test('blog without title is not added', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = {
      author: 'Olga',
      url: 'www.olganneljäsblogi.fi',
      likes: 0
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
  })

  test('blog without url is not added', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = {
      title: 'Olgan kolmas blogi',
      author: "Olga",
      likes: 0
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
  })
})

describe('deletion of a blog', async () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(
      blogsAtStart.length - 1
    )

    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).not.toContain(blogToDelete.title)
  })

  test('if id is not valid fails with 400', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const deleteId = helper.nonExistingId

    await api
      .delete(`/api/blogs/${deleteId}`)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(
      blogsAtStart.length
    )
  })
})

describe('when there is initally one user at db', async () => {
  beforeEach(async () => {
    await User.remove({})
    const user = new User({ name: 'pipapo', username: 'pipapo', password: 'sekred'})
    await user.save()
  })

  test('creation succeeds with a new username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'olgaviho',
      name: 'Olga Viholainen',
      password: 'salaisuus'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
  })

  test('creation fails if username is already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'tipu',
      username: 'pipapo',
      password: 'tsirp'
    }

    await api 
      .post('/api/users')
      .send(newUser)
      .expect(400)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length)      

  })

  test('creation fails, if there is no username', async() => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        name: 'pöllö',
        password: 'huhuu',
    }

    await api 
      .post('/api/users')
      .send(newUser)
      .expect(400)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails, if username is too short', async() => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        name: 'pöllö',
        username: 'pö',
        password: 'huhuu',
    }

    await api 
      .post('/api/users')
      .send(newUser)
      .expect(400)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails, if password is too short', async() => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        name: 'pöllö',
        username: 'pöllönen',
        password: 'hu',
    }

    await api 
      .post('/api/users')
      .send(newUser)
      .expect(400)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails, if there is no password', async() => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        name: 'pöllö',
        username: 'PikkuPöllö',

    }

    await api 
      .post('/api/users')
      .send(newUser)
      .expect(400)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})