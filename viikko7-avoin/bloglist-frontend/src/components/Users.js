import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Header, List } from 'semantic-ui-react'

const Users = (props) => {
  if (props.users === undefined) {
    return (
      null
    )
  }

  const numberOfBlogs = (uid) => {
    const userBlogs = props.blogs.filter(b => b.user !== null)
    const usersBlogs = userBlogs.filter(b => b.user.id === uid)

    return usersBlogs.length
  }

  return (
    <div>
      <Header as='h3'> Users </Header>
      <List>
        {props.users.map(u =>
          <List.Item key={u.id}>
            <Link to={`/users/${u.id}`}>
              {u.username}
            </Link> number of blogs: {numberOfBlogs(u.id)}
          </List.Item>
        )}
      </List>
    </div >
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    users: state.users
  }
}

export default connect(mapStateToProps, null)(Users)