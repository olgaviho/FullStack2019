import React from 'react'

const OneUser = (props) => {

  if (props.user === undefined) {

    return null
  } else {

    return (

      <div>


        <h2>{props.user.name}</h2>
        <h4>Added blogs</h4>
        <div>
          {props.user.blogs.map(blog =>
            <li> {blog.title} </li>
          )}
        </div>
      </div>
    )
  }
}

export default OneUser