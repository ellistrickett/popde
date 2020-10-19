import React from 'react';

const Input = ({ message, setInputMessage, sendMessage }) => (
  <form className="form">
    <input 
    className="input"
    type="text"
    placeholder="Type a message..."
    value={message} 
    onChange={(event) => setInputMessage(event.target.value)} 
    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="sendButton" onClick={(event) => sendMessage(event)}>send</button>
  </form>
)

export default Input;