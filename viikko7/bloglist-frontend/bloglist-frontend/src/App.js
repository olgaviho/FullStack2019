import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import Menu from './components/Routers'
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
  const [users, setUsers] = useState([])


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    userService.getAll().then(users =>
      setUsers(users)
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



  const sortBlogs = (blogs) => {
    blogs.sort(function (a, b) {
      return b.likes - a.likes
    })
    return blogs
  }

  return (
    <div>
      <Menu users={users}
        sortBlogs={sortBlogs}
        user={user}
        message={message}
        password={password}
        username={username}
        handleLogin={handleLogin}
        newAuthor={newAuthor}
        newLikes={newLikes}
        newTitle={newTitle}
        newUrl={newUrl}
        setNewAuthor={setNewAuthor}
        setNewLikes={setNewLikes}
        setNewTitle={setNewTitle}
        setNewUrl={setNewUrl}
        addBlog={addBlog}
        handleLogout={handleLogout}
        blogs={blogs}
        updateBlog={updateBlog}
        deleteBlog={deleteBlog}
      />
    </div>
  )

}

export default App