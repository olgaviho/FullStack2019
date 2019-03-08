import React from 'react'
import PropTypes from 'prop-types'
import { Button, Input } from './Style'

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
          <Input type="text" value={newTitle} name="Title"
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>

        <div>
          author
          <Input type="text" value={newAuthor} name="Author"
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>

        <div>
          url
          <Input type="text" value={newUrl} name="Url"
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <div>
          likes
          <Input type="number" value={newLikes} name="Likes"
            onChange={({ target }) => setNewLikes(target.value)}
          />
        </div>

        <Button type="submit">Add new Blog</Button>
      </form >
    </div>
  )
}


export default CreateBlogForm