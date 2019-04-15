import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Users = (props) => {
  if (props.users === undefined) {
    return (
      null
    )
  }

  const numberOfBlogs = (uid) => {
    const userBlogs = props.blogs.filter(b => b.user !== null)
    const usersBlogs = userBlogs.filter(b => b.user.id === uid)

    return usersBlogs.length
  }

  return (
    <div>
      <h3> Users </h3>
      {props.users.map(u => <li key={u.id}>
        <Link to={`/users/${u.id}`}>{u.username} </Link> number of blogs: {numberOfBlogs(u.id)}
      </li>)
      }
    </div>
  )


}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    users: state.users
  }
}

export default connect(mapStateToProps, null)(Users)