import React, { useEffect, useState, useReducer } from 'react';
import io from 'socket.io-client';
import Input from './Input';
import Messages from './Messages';
import InfoBar from './InfoBar';
import { connect } from 'react-redux';


const socket = io('http://localhost:5000/');

const Chat = ({ auth: { user }, match }) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    console.log(socket.connected); // false

    socket.on('connect', () => {
      console.log(socket.connected); // true
      socket.emit('joinChat')
    });

    socket.on('disconnect', () => {
      console.log(socket.connected); // false
    });

    socket.on('message', message => {
      console.log(message)
    })
  }, []);
    useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })
  }, [messages])

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', { body: message, seen: false, sender: user._id, recipient: match.params.id }, () => setMessage(''))
    }
  }

  return ( 
    <div className="outer-container">
      <div className="container">
        <InfoBar />
        <Messages messages={messages.map(message => (message.body))} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
    )
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(Chat);