import React from 'react'

import {
  Link
} from 'react-router-dom'

const Users = (props) => {


  if (props.users.length === 0) {
    return null
  }

  return (
    <div>
      <h2>Users</h2>
      <div>
        {props.users.map(user => {
          const userBlogs = props.blogs.filter((blog) => blog.user && blog.user.id === user.id)


          return (<li key={user.id}>
            <Link to={`/users/${user.id}`}> {user.name} blogs: {userBlogs.length}</Link>
          </li>)
        }

        )}
      </div>
    </div>
  )
}

export default Users