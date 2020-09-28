import {
  LIKE_PRODUCT,
  UNLIKE_PRODUCT,
  GET_MY_LIKES,
  GET_LIKES_BY_SHOP,
} from '../actions/types';

const initialState = {
  likes: [],
  like: null,
  loading: true,
  error: {}
}

export default function(state=initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case LIKE_PRODUCT:
      return { 
        ...state,
        likes: payload,
        loading: false
      }
    case UNLIKE_PRODUCT:
      return { 
        ...state,
        likes: payload,
        loading: false
      }
    case GET_MY_LIKES:
    case GET_LIKES_BY_SHOP:
      return { 
        ...state,
        likes: payload,
        loading: false
      }
      default:
        return state;
    }
  }