import React from 'react'


const OneBlog = (props) => {

  if (props.blog === undefined) {
    return null
  } else {

    let deleteVisible = false

    console.log('props', props)

    if (props.user !== null) {
      if (props.blog.user.username === props.user.username) {
        deleteVisible = true
      }
    }


    // let deleteVisible = false

    // if (props.user === null) {
    //   deleteVisible = false
    // } else if (props.user !== null) {
    //   if (props.blog.user === null) {
    //     deleteVisible = false
    //   } else if (props.blog.user.username === props.user.username) {
    //     deleteVisible = true
    //   } else {
    //     deleteVisible = false
    //   }
    // }

    const showWhenUserOwner = {
      display: deleteVisible ? '' : 'none',
    }

    return (
      <div>
        <h2>{props.blog.title}</h2>

        <li>{props.blog.url}</li>
        <li>{props.blog.author}</li>
        <li>Likes: {props.blog.likes}</li>
        <button onClick={() => props.updateBlog(props.blog)}>like</button>
        <div style={showWhenUserOwner}>
          <button onClick={() => props.deleteBlog(props.blog)}>delete</button>
        </div>
      </div >
    )
  }

}
export default OneBlog