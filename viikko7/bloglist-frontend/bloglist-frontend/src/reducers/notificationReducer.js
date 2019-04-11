const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'ADD':
    return action.text
  default:
    return state

  case 'LIKE':
    return action.text
  }
}

export default notificationReducer