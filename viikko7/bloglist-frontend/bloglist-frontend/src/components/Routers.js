import React from 'react'
import Users from './Users'
import OneUser from './OneUser'
import OneBlog from './OneBlog'
import Notification from './Notification'
import LoginUserForm from './LoginUser'
import Home from './Home'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'


const Menu = ({ sortBlogs, user, message, password, username, handleLogin, newAuthor,
  newLikes, newTitle, newUrl, setNewAuthor, setNewLikes, setNewUrl, addBlog, setNewTitle,
  handleLogout, updateBlog, deleteBlog, blogs, users }) => {


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
  const padding = { padding: 5 }


  return (

    <div>
      <h3>Hei {user.username}!</h3>

      <form onSubmit={handleLogout}>
        <button type="submit">logout</button>
      </form>

      <Router>
        <div>
          <div>
            <Link style={padding} to="/users">users</Link>
            <Link style={padding} to="/">blogs</Link>
          </div>
          <Route exact path="/users" render={() => <Users users={users} blogs={blogs} />} />
          <Route exact path="/users/:id" render={({ match }) =>
            <OneUser user={userById(match.params.id, users)} />
          } />

          <Route exact path="/blogs/:id" render={({ match }) =>
            <OneBlog blog={blogById(match.params.id, blogs)} updateBlog={updateBlog}
              user={user} deleteBlog={deleteBlog} />
          } />

          <Route exact path="/" render={() => <Home users={users}
            sortBlogs={sortBlogs} user={user} message={message} newAuthor={newAuthor}
            newLikes={newLikes} newTitle={newTitle} newUrl={newUrl}
            setNewAuthor={setNewAuthor} setNewLikes={setNewLikes} setNewUrl={setNewUrl}
            addBlog={addBlog} setNewTitle={setNewTitle} updateBlog={updateBlog}
            deleteBlog={deleteBlog} blogs={blogs} />} />

        </div>
      </Router>
    </div>
  )
}

const userById = (id, users) => {

  const user = users.find(user => user.id === id)
  return user
}
const blogById = (id, blogs) => {

  const blog = blogs.find(blog => blog.id === id)
  return blog
}

export default Menu