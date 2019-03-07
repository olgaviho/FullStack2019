import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationOut } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import React from 'react'

const NewAnecdote = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)

    setTimeout(() => {
      props.notificationOut('')
    }, 5000)    
  }

  return (
    <div>
      <h2>Create new Anecdote</h2>
      <form onSubmit={addAnecdote}>
        <input type='text' name='anecdote' />
        <button type='submit'> create </button>
      </form>
    </div>
  )
}

export default connect (
  null,
  { createAnecdote,
  notificationOut}
)(NewAnecdote)

