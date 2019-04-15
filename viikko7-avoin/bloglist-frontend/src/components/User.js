import React from 'react'
import { connect } from 'react-redux'

const User = (props) => {
  if (props.user === undefined) {
    return null
  }

  const usersBlogs = (uid) => {
    const blogsWithUser = props.blogs.filter(b => b.user !== null)
    const usersBlogs = blogsWithUser.filter(b => b.user.id === uid)

    return usersBlogs
  }


  if (usersBlogs(props.user.id).length === 0) {
    return (
      <div>
        <h2>{props.user.name}</h2>
        <h3>This user does not have any blogs</h3>
      </div>
    )
  }

  return (
    <div>
      <h2>{props.user.name}</h2>
      <h3>added blogs:</h3>
      {usersBlogs(props.user.id).map(b =>
        <li key={b.id} > {b.title}</li>)}
    </div>
  )
}


const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    users: state.users
  }
}

export default connect(mapStateToProps, null)(User)
