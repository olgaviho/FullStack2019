import React from 'react'
import { Notif } from './Style'
import { connect } from 'react-redux'

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

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}

export default connect (
  mapStateToProps,
  null
) (Notification)