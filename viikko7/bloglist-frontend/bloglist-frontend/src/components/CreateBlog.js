import React from 'react'
import PropTypes from 'prop-types'

const CreateBlogForm = ({
  addBlog,
  newTitle,
  setNewTitle,
  newAuthor,
  setNewAuthor,
  newLikes,
  setNewLikes,
  newUrl,
  setNewUrl
}) => {

  CreateBlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired,
    newTitle: PropTypes.string.isRequired,
    newUrl: PropTypes.string.isRequired
  }


  return (
    <div>
      <h3>Add a new Blog</h3>
      <form onSubmit={addBlog} >
        <div>
          title
          <input type="text" value={newTitle} name="Title"
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>

        <div>
          author
          <input type="text" value={newAuthor} name="Author"
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>

        <div>
          url
          <input type="text" value={newUrl} name="Url"
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <div>
          likes
          <input type="number" value={newLikes} name="Likes"
            onChange={({ target }) => setNewLikes(target.value)}
          />
        </div>

        <button type="submit">Add new Blog</button>
      </form >
    </div>
  )
}


export default CreateBlogForm