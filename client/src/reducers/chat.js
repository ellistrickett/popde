import {
  FIND_USER,
  CHAT_ERROR
} from '../actions/types';

const initialState = {
  chatUser: {},
  loading: true,
  error: {}
}

export default function(state=initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case FIND_USER:
      return { 
        ...state,
        chatUser: payload,
        loading: false
      }
    case CHAT_ERROR:
      return {
        ...state,
        chatUser: payload,
        loading: false
      }
      default:
        return state;
    }
  }