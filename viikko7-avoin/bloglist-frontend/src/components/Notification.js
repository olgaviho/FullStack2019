import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = (props) => {
  if (props.notification === null) {
    console.log('on null')
    console.log('props', props)
    return null
  }

  console.log(props.notification)
  console.log('ei ole null')

  return (
    <div >
      <Message>
        {props.notification}
      </Message>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)