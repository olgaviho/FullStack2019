import React from 'react'
import {
  Link
} from 'react-router-dom'

const Blog = ({ blog }) => {


  const pad = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={pad}>
      <Link to={`/blogs/${blog.id}`} > {blog.title} </Link>
    </div >
  )
}

export default Blog