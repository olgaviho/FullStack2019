import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlog'
import LoginUserForm from './components/LoginUser'
import Togglable from './components/Togglable'
import { useField } from './hooks'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newLikes, setNewLikes] = useState(0)
  const [message, setMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      likes: newLikes,
      url: newUrl,
    }

    blogService
      .create(blogObject).then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
    setMessage(`uusi blogi luotu ${blogObject.title}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)

  }

  const updateBlog = (updatedBlog) => {

    const blogObject = {
      title: updatedBlog.title,
      author: updatedBlog.author,
      likes: updatedBlog.likes + 1,
      url: updatedBlog.url,
      id: updatedBlog.id,
    }

    blogService
      .update(blogObject).then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : returnedBlog))
      })

    setMessage(`blogia on päivitetty ${blogObject.title}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const deleteBlog = (deletedBlog) => {

    const blogObject = {
      title: deletedBlog.title,
      author: deletedBlog.author,
      likes: deletedBlog.likes,
      url: deletedBlog.url,
      id: deletedBlog.id
    }

    blogService
      .remove(blogObject).then(
        setBlogs(blogs.filter((returnedBlog => returnedBlog.id !== deletedBlog.id))
        )
      )

    setMessage(`blogi on poistettu ${blogObject.title}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)

  }


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      console.log(username)
      console.log(password)
      const user = await loginService.login({
        username: username.value, password: password.value
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)

    } catch (ex) {

      setMessage('epäonnistunut kirjautuminen')
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      await loginService.logout({
      })

      window.localStorage.removeItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(null)

    } catch (ex) {
      console.log('pieleen meni uloskirjautuminen')
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message} />
        <h2>Log in to application</h2>


        <LoginUserForm
          password={password}
          username={username}
          handleLogin={handleLogin}
        />

      </div>
    )
  }

  const sortBlogs = (blogs) => {
    blogs.sort(function (a, b) {
      return b.likes - a.likes
    })
    return blogs
  }

  return (
    <div>

      <Notification message={message} />

      <h3>Hei {user.username}!</h3>

      <form onSubmit={handleLogout}>
        <button type="submit">logout</button>
      </form>

      <h2>blogs</h2>

      {sortBlogs(blogs).map(blog =>
        <Blog blog={blog} updateBlog={updateBlog}
          deleteBlog={deleteBlog} key={blog.id} user={user}
        />

      )}

      <Togglable buttonLabel='create'>
        <CreateBlogForm
          newAuthor={newAuthor}
          newLikes={newLikes}
          newTitle={newTitle}
          newUrl={newUrl}
          setNewAuthor={setNewAuthor}
          setNewLikes={setNewLikes}
          setNewTitle={setNewTitle}
          setNewUrl={setNewUrl}
          addBlog={addBlog}
        />
      </Togglable>
    </div>
  )
}
export default App