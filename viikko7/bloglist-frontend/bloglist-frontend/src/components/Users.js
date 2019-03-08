import React from 'react'
import { Pad } from './Style'
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
          return (
            <Pad key={user.id}>
              <Link to={`/users/${user.id}`}> {user.name} blogs: {userBlogs.length}</Link>
            </Pad>)
        })}
      </div>
    </div>
  )
}

export default Users