import React from 'react'


const OneBlog = (props) => {

  console.log(props.title)
  console.log('oneblog')

  if (props.blog === undefined) {
    return null
  } else {
    return (
      <div>

      </div>
    )
  }
}

export default OneBlog