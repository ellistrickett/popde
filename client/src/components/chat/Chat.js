import React, { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000/');

const Chat = () => {
  useEffect(() => {
    console.log(socket.connected); // false

    socket.on('connect', () => {
      console.log(socket.connected); // true
    });

    socket.on('disconnect', () => {
      console.log(socket.connected); // false
    });
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    socket.emit('chatMessage', msg);
    e.target.elements.msg.value = ''
    e.target.elements.msg.focus()
  }

  return ( 
    <div>
      <div className="messages-header">
        <h1 className="messages-text">Messages</h1>
      </div>
      <div className="chat-messages"></div>
      <div className="chat-form-container">
        <form id="chat-form" onSubmit={e => onSubmit(e)}>
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
            autoComplete="off"
          />
          <input type="submit" className="btn" value="message" />
        </form>
      </div> 
    </div>
    )
}

export default Chat