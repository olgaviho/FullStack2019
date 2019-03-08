import React from 'react'
import { Notif } from './Style'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <Notif className="error">
      {message}
    </Notif>
  )
}

export default Notification