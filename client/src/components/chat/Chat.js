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
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    findUser(match.params.id)
  }, [findUser])

  // useEffect(() => {
  //   var arr = []
  //   arr.push(user.username.substring(0, 4))
  //   arr.push(shop.username.substring(0, 4))
  //   var room1 = (arr.sort().join("_"));
  //   console.log(room1)
  // }, []);

    useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })
  }, [messages])

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