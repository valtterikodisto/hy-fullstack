const initialState = {
  notification: 'Default message',
  display: 'none'
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SHOW':
      return { notification: action.notification, display: '' }
    case 'HIDE':
      return initialState
    default:
      return state
  }
}

// Action creators

export const showNotification = (notification, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW',
      notification
    })

    setTimeout(() => {
      dispatch({
        type: 'HIDE'
      })
    }, seconds * 1000)
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE'
  }
}

export default notificationReducer