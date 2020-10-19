import {
  FIND_USER,
  CHAT_ERROR,
  GET_CHAT_NAME
} from '../actions/types';

const initialState = {
  chatUser: {},
  chatName: "",
  loading: true,
  error: {}
}

export default function(state=initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case GET_CHAT_NAME:
      return {
        ...state,
        chatName: payload,
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