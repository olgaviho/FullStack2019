import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD',
      text: 'New anecdote added',
      data: newAnecdote.content,
    })
  }
}

export const voteA = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(anecdote)
    dispatch({
      type: 'VOTE',
      text: 'vote saved',
      data: updatedAnecdote,
    })
    }
  }


const sortAnec = (anecdotes) => {
  anecdotes.sort(function (a, b) {
    return b.votes - a.votes;
  })
  return anecdotes
}


const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToFind = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToFind,
        votes: anecdoteToFind.votes + 1
      }
      let newState = state.map(anec => anec.id !== id ? anec : changedAnecdote)

      return sortAnec(newState)

    case 'ADD':
      const newAnecdote = asObject(action.data)
      let newState2 = state.concat(newAnecdote)
      return sortAnec(newState2)

    case 'INIT_ANECDOTES':
      return action.data  
    default: return state
  }

}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default reducer