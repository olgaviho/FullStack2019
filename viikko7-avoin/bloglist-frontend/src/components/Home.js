import React from 'react'
import Togglable from './Togglable'
import CreateBlogForm from './CreateBlog'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Header } from 'semantic-ui-react'

const Home = (props) => {


  return (
    <div>
      <Header as='h2'> Blogs </Header>

      {props.blogs.map(b => <li key={b.id}>
        <Link to={`/blogs/${b.id}`}>{b.title} </Link>
      </li>)}

      <Togglable buttonLabel='create'>
        <CreateBlogForm
          newAuthor={props.newAuthor}
          newLikes={props.newLikes}
          newTitle={props.newTitle}
          newUrl={props.newUrl}
          setNewAuthor={props.setNewAuthor}
          setNewLikes={props.setNewLikes}
          setNewTitle={props.setNewTitle}
          setNewUrl={props.setNewUrl}
          addBlog={props.addBlog}
        />
      </Togglable>
    </div >

  )
}



const mapStateToProps = state => {
  return {
    notification: state.notification,
    blogs: state.blogs,
    user: state.user,
    users: state.users
  }
}

export default connect(mapStateToProps, null)(Home)