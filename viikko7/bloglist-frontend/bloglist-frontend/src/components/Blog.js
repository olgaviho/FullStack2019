import React from 'react'
import {
  Link
} from 'react-router-dom'

import { Pad } from './Style'

const Blog = ({ blog }) => {

  return (
    <Pad>
      <div>
        <Link to={`/blogs/${blog.id}`} > {blog.title} </Link>
      </div >
    </Pad>
  )
}

export default Blog