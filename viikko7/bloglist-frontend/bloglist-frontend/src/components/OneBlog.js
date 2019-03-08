import React from 'react'
import { Button, OtherButton } from './Style'


const OneBlog = (props) => {

  if (props.blog === undefined) {
    return null
  } else {

    let deleteVisible = false



    if (props.user !== null && props.blog.user !== null) {
      if (props.blog.user.username === props.user.username) {
        deleteVisible = true
      }
    }

    const showWhenUserOwner = {
      display: deleteVisible ? '' : 'none',
    }

    return (
      <div>
        <h2>{props.blog.title}</h2>

        <li>{props.blog.url}</li>
        <li>{props.blog.author}</li>
        <li>Likes: {props.blog.likes}</li>
        <Button onClick={() => props.updateBlog(props.blog)}>like</Button>
        <div style={showWhenUserOwner}>
          <OtherButton onClick={() => props.deleteBlog(props.blog)}>delete</OtherButton>
        </div>
      </div >
    )
  }

}
export default OneBlog