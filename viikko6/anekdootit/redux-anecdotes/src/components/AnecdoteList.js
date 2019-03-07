import React from 'react'
import { connect } from 'react-redux'
import { voteA } from '../reducers/anecdoteReducer'
import { notificationOut } from '../reducers/notificationReducer'

const Anecdotes = (props) => {

  const vote = (id) => {
    props.voteA(id)


    setTimeout(() => {
      props.notificationOut('')
    }, 5000)
  }
  const filter = props.filter

  if (filter === 'ALL') {

    return (
      <div>
        <h2>Anecdotes</h2>

        {props.anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() =>
                vote(anecdote)}
              >vote</button>
            </div>
          </div>
        )}
      </div>
    )
  } else {

    const filterAnecdotes = props.anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))

    return (
      <div>
        <h2>Anecdotes</h2>
        
        {filterAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() =>
                vote(anecdote)}
              >vote</button>
            </div>
          </div>
        )}
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteA,
  notificationOut
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Anecdotes)
