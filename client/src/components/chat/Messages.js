import React from 'react';
import Message from './Message'




const Messages = ({ messages, name }) => {

  const displayMessages = messages => {
    if (messages === null) {
      return (
      <div>send a message</div>
      )
    }
    else {
      return (
      <div>
        {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
      </div>
      )
    }
  }

  return (
    displayMessages
  )
}

export default Messages;