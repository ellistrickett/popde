import {
  FOLLOW_USER,
  UNFOLLOW_USER,
  FOLLOW_ERROR,
  GET_MY_FOLLOWING,
  GET_MY_FOLLOWERS
} from '../actions/types';

const initialState = {
  following: [],
  followers: [],
  follow: null,
  unfollow: null,
  loading: true,
  error: {}
}

export default function(state=initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case GET_MY_FOLLOWING:
      return { 
        ...state,
        following: payload,
        loading: false
      }
    case GET_MY_FOLLOWERS:
      return { 
        ...state,
        followers: payload,
        loading: false
      }
    case FOLLOW_USER:
      return { 
        ...state,
        follow: payload,
        loading: false
      }
    case UNFOLLOW_USER: 
      return { 
        ...state,
        unfollow: payload,
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