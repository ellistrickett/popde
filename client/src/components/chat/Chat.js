import React, { useEffect, useState, useReducer } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import Input from './Input';
import Messages from './Messages';
import InfoBar from './InfoBar';
import { connect } from 'react-redux';
import { findUser } from '../../actions/chat';


const socket = io('http://localhost:5000/');

const Chat = ({ auth: { user }, match, findUser, chat: { chatUser } }) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    console.log(socket.connected); // false

    socket.on('connect', () => {
      console.log(socket.connected); // true
      socket.emit('joinChat', )
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

    useEffect(() => {
      findUser(match.params.id)
    }, [findUser])

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', { body: message, seen: false, sender: user.username, recipient: chatUser.username }, () => setMessage(''))
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

Chat.propTypes = {
  findUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  chat: state.chat
})

export default connect(mapStateToProps, { findUser })(Chat);