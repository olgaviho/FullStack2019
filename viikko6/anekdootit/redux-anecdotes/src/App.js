import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import NewAnecdote from './components/AnecdoteForm'
import Anecdotes from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initializeAnecdotes }  from './reducers/anecdoteReducer'

const App = (props) => {
  useEffect(() => {
   props.initializeAnecdotes(props.anecdotes)
  },[])

  return (
    <div>
      <Notification />
      <Filter />
      <Anecdotes  />
      <NewAnecdote />
    </div>
  )
}

export default connect(null, { initializeAnecdotes })(App)
