import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import CreateComment from './CreateComment'
import { Header, Button, List } from 'semantic-ui-react'

const OneBlog = (props) => {

  const [deletedBlog, setDeletedBlog] = useState(false)

  if (deletedBlog) {
    return (
      <div>
        <Redirect to="/users" />
      </div>
    )
  }

  const usercoms = props.comments.filter(c => c.blog !== undefined && c.blog !== null)


  const filtcom = usercoms.filter(c => {
    return (c.blog.id === props.blog.id)
  })


  if (props.blog === null) {
    return null
  } else if (props.blog.user === null) {
    return (
      <div>
        <Header as='h2'>{props.blog.title}</Header>
        <div>
          <Link to={props.blog.url}>{props.blog.url}</Link>
          <p>{props.blog.likes} likes
            <Button onClick={() => props.updateBlog(props.blog)} basic color='olive' content='olive'>like</Button> </p>
        </div>
        <div>
          <List>
            <Header as='h3'>Comments</Header>
            {filtcom.map(f =>
              <List.Item key={f.id}> {f.content} </List.Item>
            )}
          </List>
          <CreateComment addNewComment={props.addNewComment} setNewComment={props.setNewComment} blog={props.blog} />
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
      <Header as='h2'>{props.blog.title}</Header>
      <div>
        <Link to={props.blog.url}>{props.blog.url}</Link>
        <p>{props.blog.likes} likes
          <Button onClick={() => props.updateBlog(props.blog)} basic color='olive' content='olive'>like</Button> </p>
        <div style={showWhenUserOwner}>
          <Button onClick={() => {
            props.deleteBlog(props.blog)
            setDeletedBlog(true)
          }}
          basic color='red' content='red'
          >delete</Button>
        </div>
      </div>
      <div>
        <Header as='h3'>Comments</Header>
        <List>
          {filtcom.map(f =>
            <List.Item key={f.id}>
              {f.content}
            </List.Item>)}
        </List>
        <CreateComment addNewComment={props.addNewComment} setNewComment={props.setNewComment} blog={props.blog} />
      </div>
    </div>
  )

}

const mapStateToProps = state => {
  return {
    notification: state.notification,
    blogs: state.blogs,
    user: state.user,
    users: state.users,
    comments: state.comments
  }
}

export default connect(mapStateToProps, null)(OneBlog)
