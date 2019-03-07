const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'ADD':
      return action.text
    default:
      return state

    case 'VOTE':
      return action.text

    case 'NOTIFICATIONOUT':
      return action.text 
  }
}


export const notificationOut = (content) => {
  return {
    type: 'NOTIFICATIONOUT',
    text: '',
    data: {
      content
    }
  }
}

export default notificationReducer