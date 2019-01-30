import React from 'react'

const LookForm = (props) => {
  return (
    <div>
      <form >
        <input
          value={props.newLookFor}
          onChange={props.handleLookForChange}
        />
      </form >
    </div>
  )
}


export default LookForm