import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Input from './Input';
import Messages from './Messages';
import InfoBar from './InfoBar';


const socket = io('http://localhost:5000/');

const Chat = () => {
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
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  return ( 
    <div className="outer-container">
      <div className="container">
        <InfoBar />
        <Messages message={messages} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
    )
}

export default Chat