import axios from 'axios';
import {
  GET_CHAT_NAME,
  FIND_USER, 
  CHAT_ERROR
} from './types';

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
      payload: room
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