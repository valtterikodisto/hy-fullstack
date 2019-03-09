import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const anecdoteToChange = state.find(a => a.id === action.data.id)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
      const newState = state.map(anecdote => 
        anecdote.id !== action.data.id ? anecdote : changedAnecdote)
      return newState.sort((a, b) => b.votes - a.votes)
    
    case 'ADD':
      return state.concat(action.data)

    case 'INIT':
      return action.data
    
    default:
      return state;
  }
}

// Action creators

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const addAnecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    console.log('UUUUSSIIIII', newAnecdote)
    dispatch({
      type: 'ADD',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export default reducer