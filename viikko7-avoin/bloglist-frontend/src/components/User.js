import React from 'react'
import { connect } from 'react-redux'
import { List, Header } from 'semantic-ui-react'

const User = (props) => {
  if (props.user === undefined) {
    return null
  }

  const usersBlogs = (uid) => {
    const blogsWithUser = props.blogs.filter(b => b.user !== null)
    const usersBlogs = blogsWithUser.filter(b => b.user.id === uid)

    return usersBlogs
  }


  if (usersBlogs(props.user.id).length === 0) {
    return (
      <div>
        <Header as='h2'>{props.user.name}</Header>
        <Header as='h3'>This user does not have any blogs</Header>
      </div>
    )
  }

  return (
    <div>
      <Header as='h2'>{props.user.name}</Header>
      <Header as='h3'>added blogs:</Header>
      <List>
        {usersBlogs(props.user.id).map(b =>
          <List.Item key={b.id} > {b.title}</List.Item>)}
      </List>
    </div>
  )
}


const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    users: state.users
  }
}

export default connect(mapStateToProps, null)(User)
