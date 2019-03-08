import React from 'react'


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
          <input {...usernameLoput}/>
        </div>

        <div>
          password
          <input {...passwordLoput}/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}


export default LoginUserForm