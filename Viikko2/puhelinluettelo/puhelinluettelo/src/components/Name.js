import React from 'react'

const Name = (props) => {


  return (
    <li>{props.name.name} {props.name.number}
      <button onClick={() => props.deletePerson(props.name)}>
        poista
      </button>
    </li>
  )
}

export default Name