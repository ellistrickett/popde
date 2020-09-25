import {
  FOLLOW_USER,
  UNFOLLOW_USER,
  FOLLOW_ERROR,
} from '../actions/types';

const initialState = {
  follows: [],
  follow: null,
  loading: true,
  error: {}
}

export default function(state=initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case FOLLOW_USER:
      case UNFOLLOW_USER: 
      return { 
        ...state,
        follows: payload,
        loading: false
      }
    case FOLLOW_ERROR:
      return {
        ...state,
        follows: payload,
        loading: false
      }
    default:
      return state;
    }
  }