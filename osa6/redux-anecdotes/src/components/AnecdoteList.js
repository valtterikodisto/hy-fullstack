import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (id) => {
    console.log('vote', id)
    const anecdote = props.anecdotes.find(a => a.id === id)
    //store.dispatch(voteAnecdote(id))
    //store.dispatch(showNotification(`You voted '${anecdote.content}'`))
    //setTimeout(() => store.dispatch(hideNotification()), 5000)
  }

  const anecdotesToShow = () => {
    if (!props.filter) {
      return props.anecdotes
    }
    return props.anecdotes.filter(anecdote => {
      return anecdote.content.toUpperCase().includes(props.filter.toUpperCase())
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

export default connect(
  mapStateToProps
)(AnecdoteList)