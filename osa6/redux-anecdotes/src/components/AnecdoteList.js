import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (id) => {
    console.log('vote', id)
    const anecdote = props.anecdotes.find(a => a.id === id)
    props.voteAnecdote(anecdote)
    props.showNotification(`You voted '${anecdote.content}'`, 3)
  }

  return (
    <>
    {props.visibleAnecdotes.map(anecdote =>
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

const anecdotesToShow = ({ anecdotes, filter }) => {
  if (!filter) {
    return anecdotes
  }
  return anecdotes.filter(anecdote => {
    return anecdote.content.toUpperCase().includes(filter.toUpperCase())
  })
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    visibleAnecdotes: anecdotesToShow(state)
  }
}

export default connect(
  mapStateToProps,
  { voteAnecdote, showNotification, hideNotification }
)(AnecdoteList)