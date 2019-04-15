import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

const OneBlog = (props) => {

  const [deletedBlog, setDeletedBlog] = useState(false)

  if (deletedBlog) {
    return (
      <div>
        <Redirect to="/users" />
      </div>
    )
  }

  if (props.blog === null) {
    return null
  } else if (props.blog.user === null) {
    return (
      <div>
        <h2>{props.blog.title}</h2>
        <div>
          <Link to={props.blog.url}>{props.blog.url}</Link>
          <p>{props.blog.likes} likes
            <button onClick={() => props.updateBlog(props.blog)}>like</button> </p>
        </div>
      </div>
    )
  }


  let deleteVisible = false


  if (props.blog.user.username === props.user.username) {
    deleteVisible = true
  }

  const showWhenUserOwner = {
    display: deleteVisible ? '' : 'none',
  }



  return (
    <div>
      <h2>{props.blog.title}</h2>
      <div>
        <Link to={props.blog.url}>{props.blog.url}</Link>
        <p>{props.blog.likes} likes
          <button onClick={() => props.updateBlog(props.blog)}>like</button> </p>
        <div style={showWhenUserOwner}>
          <button onClick={() => {
            props.deleteBlog(props.blog)
            setDeletedBlog(true)
          }}>delete</button>
        </div>
        added by {props.blog.user.username}
      </div>
    </div>
  )

}

const mapStateToProps = state => {
  return {
    notification: state.notification,
    blogs: state.blogs,
    user: state.user,
    users: state.users
  }
}

export default connect(mapStateToProps, null)(OneBlog)
