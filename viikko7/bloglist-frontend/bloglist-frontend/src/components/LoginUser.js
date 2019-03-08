import React from 'react'
import { Button, Input } from './Style'


const LoginUserForm = ({

  username,
  password,
  handleLogin

}) => {


  const { reset, ...usernameLoput } = username

  const { reset: reset2, ...passwordLoput } = password
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <Input {...usernameLoput}/>
        </div>

        <div>
          password
          <Input {...passwordLoput}/>
        </div>
        <Button type="submit">login</Button>
      </form>
    </div>
  )
}


export default LoginUserForm