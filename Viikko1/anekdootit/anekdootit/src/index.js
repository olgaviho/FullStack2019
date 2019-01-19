import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Random = (props) => {
  return (
    <div>
      {props.anecdotes[props.number]}
    </div>
  )
}

const Max = (props) => {
  const maxim = Math.max(...props.arr)
  return (
    <div>
      {props.anecdotes[props.arr.indexOf(maxim)]}
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = (props) => {
  const [showAnecdote, setShowAnecdote] = useState(false)
  const [votes, setVotes] = useState(new Uint8Array(6))

  const number = Math.floor((Math.random() * 5));

  const handleVote = () => {
    const copy = [...votes]
    copy[number] += 1
    setVotes(copy)
  }

  if (showAnecdote) {
    return (
      <div>
        <h1>Anecdote of the day</h1>
        <p>This anecdote has {votes[number]} votes </p>
        <Random anecdotes={anecdotes} number={number} />
        <p></p>
        <Button handleClick={handleVote} text='vote' />
        <p></p>
        <Button handleClick={() => setShowAnecdote(true)} text='next anecdote' />
        <h1>Anecdote with most votes</h1>
        <Max arr={votes} anecdotes={anecdotes}/>
      </div>
    )
  }

  return (
    <div>
      <Button handleClick={() => setShowAnecdote(true)} text='next anecdote' />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)