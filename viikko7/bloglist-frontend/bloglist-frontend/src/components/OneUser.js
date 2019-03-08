import React from 'react'
import { Pad } from './Style'

const OneUser = (props) => {

  if (props.user === undefined) {

    return null
  } else {

    const userBlogs = props.blogs.filter((blog) => blog.user && blog.user.id === props.user.id)
    return (

      <div>
        <h2>{props.user.name}</h2>
        <h4>Added blogs</h4>
        <div>
          <Pad>
            {userBlogs.map(blog =>
              <li key={blog.id}>
                {blog.title}
              </li>)
            }
          </Pad>
        </div>

      </div>
    )
  }
}

export default OneUser