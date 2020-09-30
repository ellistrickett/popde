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
  return ( <div>Chat</div> )
}

export default Chat