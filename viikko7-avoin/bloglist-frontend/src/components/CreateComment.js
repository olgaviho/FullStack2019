import React from 'react'
import { Button, Input, Header } from 'semantic-ui-react'

const CreateBlogForm = (props) => {

  return (
    <div>
      <Header as='h4'>Add a new Comment</Header>
      <div>
        text
        <Input type="text" name="Text"
          onChange={({ target }) => props.setNewComment(target.value)}
        />
        <Button onClick={() => props.addNewComment(props.blog)} basic color='olive' content='olive'>add</Button>
      </div>
    </div>
  )
}


export default CreateBlogForm