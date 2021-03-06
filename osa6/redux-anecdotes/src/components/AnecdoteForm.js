import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const add = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.addAnecdote(content)
    props.showNotification(`You added '${content}'`, 3)
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

export default connect(
  null,
  { addAnecdote, showNotification, hideNotification }
)(AnecdoteForm)