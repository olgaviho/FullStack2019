const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'NEW_NOTIFICATION':
    return action.content
  case 'CLEAR_NOTIFICATION':
    return null
  default:
    return state
  }

}

export const setNotification = (content) => {
  console.log('setNotification')
  return dispatch => {
    dispatch({
      type: 'NEW_NOTIFICATION',
      content
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, 5000)
  }
}


export default notificationReducer