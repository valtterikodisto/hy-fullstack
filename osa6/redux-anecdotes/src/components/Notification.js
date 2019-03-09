import React from 'react';

const Notification = ({ store }) => {
  const notification = store.getState().notification

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notification.display
  }

  return (
    <div style={style}>
      { notification.notification }
    </div>
  )
}

export default Notification
