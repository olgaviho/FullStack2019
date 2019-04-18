import React from 'react'
import { Header, Input, Button } from 'semantic-ui-react'

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


  return (
    <div>
      <Header as='h3'> Log in to application </Header>
      <form onSubmit={addBlog} >
        <div>
          title
          <Input type="text" value={newTitle} name="Title" id='Title'
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>

        <div>
          author
          <Input type="text" value={newAuthor} name="Author" id='Author'
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>

        <div>
          url
          <Input type="text" value={newUrl} name="Url" id='Url'
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <div>
          likes
          <Input type="number" value={newLikes} name="Likes" id='Likes'
            onChange={({ target }) => setNewLikes(target.value)}
          />
        </div>

        <Button type="submit" basic color='olive' content='olive'>Add new Blog </Button>
      </form >
    </div>
  )
}


export default CreateBlogForm