import loginService from './../services/login'
import blogService from './../services/blogs'

const loginReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const setUser = (data) => {
  return async dispatch => {

    blogService.setToken(data.token)
    dispatch({
      type: 'LOGIN',
      data: data
    })
  }
}


export const loginUser = (data) => {
  return async dispatch => {
    const user = await loginService.login(data)

    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )

    blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}


export const logoutUser = (data) => {
  return async dispatch => {
    await loginService.logout()
    window.localStorage.removeItem(
      'loggedBlogappUser', JSON.stringify(data)
    )

    dispatch({
      type: 'LOGOUT',
    })
  }
}

export default loginReducer