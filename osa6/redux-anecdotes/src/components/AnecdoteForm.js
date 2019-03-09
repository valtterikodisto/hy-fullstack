import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const add = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    props.store.dispatch(addAnecdote(content))
    props.store.dispatch(showNotification(`You added '${content}'`))
    setTimeout(() => props.store.dispatch(hideNotification()), 5000)
    event.target.anecdote.value = ''
  }

  return (
    <>
    <h2>create new</h2>
    <form onSubmit={add}>
      <div><input name="anecdote" /></div>
      <button>create</button>
    </form>
    </>
  )
}

export default AnecdoteForm