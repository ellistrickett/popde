import React, { useEffect, useState, useReducer } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import Input from './Input';
import Messages from './Messages';
import InfoBar from './InfoBar';
import { connect } from 'react-redux';
import { getMessages } from '../../actions/chat';

const socket = io('http://localhost:5000/');

const Chat = ({ auth: { user }, getMessages, chat: { chatUser, chatName, messages }, match,  }) => {
  const [inputMessage, setInputMessage] = useState("")

  useEffect(() => {
    getMessages(chatName)
  }, [getMessages])

  useEffect(() => {
    socket.on('message', () => {
      getMessages(chatName)
    })
  }, [messages])

  const sendMessage = (event) => {
    event.preventDefault();

    if(inputMessage) {
      socket.emit('sendMessage', { chatName: chatName, body: inputMessage, seen: false, sender: user.username, recipient: chatUser.username, senderId: user._id, recipientId: user._id }, () => setInputMessage(''))
    }
  }

  return ( 
    <div className="outer-container">
      <div className="container">
        <InfoBar />
        <Messages messages={messages} />
        <Input inputMessage={inputMessage} setInputMessage={setInputMessage} sendMessage={sendMessage} />
      </div>
    </div>
    )
}

Chat.propTypes = {
  getMessages: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  chat: state.chat
})

export default connect(mapStateToProps, { getMessages })(Chat);