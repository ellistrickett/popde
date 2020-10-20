import axios from 'axios';
import {
  GET_CHAT_NAME,
  FIND_USER,
  GET_MESSAGES,
  CHAT_ERROR
} from './types';

// Get Messages
export const getMessages = room => async dispatch => {
  try {
    const res = await axios.get(`/api/chat/${room}`);

    dispatch({ 
      type: GET_MESSAGES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: CHAT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Get Chat Name
export const getChatName = (id, user) => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${id}`);

    console.log(res.data.username)

    var arr = []
    arr.push(user.username.substring(0, 4))
    arr.push(res.data.username.substring(0, 4))

    const room = (arr.sort().join("_")) 

    dispatch({ 
      type: GET_CHAT_NAME,
      payload: { chatName: room, chatUser: res.data }
    })
  } catch (err) {
    dispatch({
      type: CHAT_ERROR,
      payload: { msg: "Unable to get Chat Name!" }
    })
  }
}

// Add like
export const findUser = id => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${id}`);

    dispatch({ 
      type: FIND_USER,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: CHAT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}