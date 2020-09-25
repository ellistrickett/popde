import {
  GET_SHOP,
  SHOP_ERROR
} from '../actions/types';

const initialState = {
  shops: [],
  shop: null,
  loading: true,
  error: {}
}

export default function(state=initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case GET_SHOP:
      return { 
        ...state,
        shop: payload,
        loading: false
      }
      case SHOP_ERROR:
        return {
          ...state,
          shops: payload,
          loading: false
        }
      default:
        return state;
    }
  }