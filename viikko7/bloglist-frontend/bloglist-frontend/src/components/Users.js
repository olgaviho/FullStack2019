import React from 'react'

import {
  Link
} from 'react-router-dom'

const Users = (props) => {

  if (props.users === []) {
    return null
  }
  return (
    <div>
      <h2>Users</h2>
      <div>
        {props.users.map(user =>
          <li key={user.id}>
            <Link to={`/users/${user.id}`}> {user.name} blogs: {user.blogs.length}</Link>
          </li>
        )}
      </div>
    </div>
  )
}

export default Users