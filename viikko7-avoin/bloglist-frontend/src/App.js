import React, { useState, useEffect } from 'react'
import Home from './components/Home'
import Notification from './components/Notification'
import LoginUserForm from './components/LoginUser'
import Users from './components/Users'
import { useField } from './hooks'
import { connect } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, editBlog, deleteBlog } from './reducers/blogsReducer'
import { loginUser, logoutUser, setUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/usersReducer'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'
import User from './components/User'
import OneBlog from './components/OneBlog'


const App = (props) => {
  const username = useField('text')
  const password = useField('password')
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newLikes, setNewLikes] = useState(0)


  useEffect(() => {
    props.initializeBlogs()
    props.initializeUsers()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      props.setUser(user)
    }
  }, [])

  const userById = (id) => {
    const uuseri = props.users.find(u => u.id === id)
    return uuseri
  }


  const blogById = (id) => {
    const blogi = props.blogs.find(b => b.id === id)
    return blogi
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      likes: newLikes,
      url: newUrl,
    }

    props.createBlog(blogObject)
    props.setNotification(`uusi blogi luotu ${blogObject.title}`)

  }

  const updateBlog = (updatedBlog) => {

    const blogObject = {
      title: updatedBlog.title,
      author: updatedBlog.author,
      likes: updatedBlog.likes + 1,
      url: updatedBlog.url,
      id: updatedBlog.id,
    }

    props.editBlog(blogObject)

    props.setNotification(`blogia on päivitetty ${blogObject.title}`)
  }

  const deleteBlog = (deletedBlog) => {

    const blogObject = {
      title: deletedBlog.title,
      author: deletedBlog.author,
      likes: deletedBlog.likes,
      url: deletedBlog.url,
      id: deletedBlog.id
    }

    props.deleteBlog(blogObject)
    props.setNotification(`blogi on poistettu ${blogObject.title}`)

  }


  const handleLogin = async (event) => {
    event.preventDefault()
    const user = {
      username: username.value,
      password: password.value
    }
    props.loginUser(user)


  }


  const handleLogout = async (event) => {
    event.preventDefault()
    props.logoutUser(props.user)

  }

  const sortBlogs = (blogs) => {
    blogs.sort(function (a, b) {
      return b.likes - a.likes
    })
    return blogs
  }

  if (props.user !== null) {
    const padding = { padding: 5 }

    return (
      <div>

        <Notification />

        <h3>Hei!</h3>
        <form onSubmit={handleLogout}>
          <button type="submit">logout</button>
        </form>

        <Router>
          <div>
            <div>
              <Link style={padding} to="/"> home</Link>
              <Link style={padding} to="/users">users</Link>
            </div>
            <Route exact path="/users" render={() =>
              <Users />} />
            <Route exact path="/" render={() =>
              <Home setNewTitle={setNewTitle} setNewUrl={setNewUrl}
                setNewAuthor={setNewAuthor} addBlog={addBlog} updateBlog={updateBlog}
                deleteBlog={deleteBlog} sortBlogs={sortBlogs} setNewLikes={setNewLikes} />} />
            <Route path="/users/:id" render={({ match }) =>
              <User user={userById(match.params.id)} />} />
            <Route path="/blogs/:id" render={({ match }) =>
              <OneBlog blog={blogById(match.params.id)} updateBlog={updateBlog} deleteBlog={deleteBlog} />} />
          </div>
        </Router>
      </div>
    )
  } else {
    return (
      <div>
        <Notification />
        <h2>Log in to application</h2>


        <LoginUserForm
          password={password}
          username={username}
          handleLogin={handleLogin}
        />
      </div>
    )
  }
}

const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
  createBlog,
  editBlog,
  deleteBlog,
  logoutUser,
  loginUser,
  setUser,
  initializeUsers
}

const mapStateToProps = state => {
  return {
    notification: state.notification,
    blogs: state.blogs,
    user: state.user,
    users: state.users
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)