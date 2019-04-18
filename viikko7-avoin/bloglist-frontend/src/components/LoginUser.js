import React from 'react'
import { Input, Button } from 'semantic-ui-react'


const LoginUserForm = ({

  username,
  password,
  handleLogin

}) => {


  return (
    <div>

      <form onSubmit={handleLogin}>
        <div>
          username
          <Input {...username}/>
        </div>

        <div>
          password
          <Input {...password}/>
        </div>
        <Button type="submit" basic color = 'olive' content='olive'>login</Button>
      </form>
    </div>
  )
}


export default LoginUserForm