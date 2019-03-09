import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
  const { anecdotes, filter } = store.getState()

  const vote = (id) => {
    console.log('vote', id)
    const anecdote = anecdotes.find(a => a.id === id)
    store.dispatch(voteAnecdote(id))
    store.dispatch(showNotification(`You voted '${anecdote.content}'`))
    setTimeout(() => store.dispatch(hideNotification()), 5000)
  }

  const anecdotesToShow = () => {
    if (!filter) {
      return anecdotes
    }
    return anecdotes.filter(anecdote => {
      return anecdote.content.toUpperCase().includes(filter.toUpperCase())
    })
  }

  return (
    <>
    {anecdotesToShow().map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )}
    </>
  )
}

export default AnecdoteList