import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [informationVisible, setInformationVisible] = useState(false)


  const hideWhenVisible = {
    display: informationVisible ? 'none' : '',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = {
    display: informationVisible ? '' : 'none',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }



  let deleteVisible = false

  if (user === null) {
    deleteVisible = false
  } else if (user !== null) {
    if (blog.user === null) {
      deleteVisible = false
    } else if (blog.user.username === user.username) {
      deleteVisible = true
    } else {
      deleteVisible = false
    }
  }

  const showWhenUserOwner = {
    display: deleteVisible ? '' : 'none',
  }


  return (

    <div>
      <div style={hideWhenVisible}>

        <div onClick={() => setInformationVisible(true)}>
          {blog.title}
        </div>
      </div>

      <div style={showWhenVisible}>
        <div onClick={() => setInformationVisible(false)}>
          <p>{blog.title}</p>
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          <p> likes: {blog.likes}</p>
          <button onClick={() => updateBlog(blog)}>like</button>
          <div style={showWhenUserOwner}>
            <button onClick={() => deleteBlog(blog)}>delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog