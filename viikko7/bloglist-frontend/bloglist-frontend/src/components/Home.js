import React from 'react'
import CreateBlogForm from './CreateBlog'
import Togglable from './Togglable'
import Blog from './Blog'

const Home = ({ sortBlogs, user, newAuthor,
  newLikes, newTitle, newUrl, setNewAuthor, setNewLikes, setNewUrl, addBlog, setNewTitle, updateBlog, deleteBlog, blogs }) => {

  return (
    <div>

      <h2>blogs</h2>

      {sortBlogs(blogs).map(blog =>
        <Blog blog={blog} updateBlog={updateBlog}
          deleteBlog={deleteBlog} key={blog.id} user={user}
        />
      )}

      <Togglable buttonLabel='create'>
        <CreateBlogForm
          newAuthor={newAuthor}
          newLikes={newLikes}
          newTitle={newTitle}
          newUrl={newUrl}
          setNewAuthor={setNewAuthor}
          setNewLikes={setNewLikes}
          setNewTitle={setNewTitle}
          setNewUrl={setNewUrl}
          addBlog={addBlog}
        />
      </Togglable>
    </div>
  )
}


export default Home