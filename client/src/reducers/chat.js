import {
  FIND_USER,
  CHAT_ERROR,
  GET_CHAT_NAME, 
  GET_MESSAGES
} from '../actions/types';

const initialState = {
  chatUser: {},
  chatName: "",
  messages: [],
  loading: true,
  error: {}
}

export default function(state=initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case GET_MESSAGES: 
      return {
        ...state,
        messages: payload,
        loading: false
      }
    case GET_CHAT_NAME:
      return {
        ...state,
        chatUser: payload.chatUser, 
        chatName: payload.chatName,
        loading: false
      }
    case FIND_USER:
      return { 
        ...state,
        chatUser: payload,
        loading: false
      }
    case CHAT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
      default:
        return state;
    }
  }