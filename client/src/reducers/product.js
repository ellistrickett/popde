import {
  GET_PRODUCTS,
  PRODUCT_ERROR,
  GET_MY_PRODUCTS
} from '../actions/types';

const initialState = {
  products: [],
  product: null,
  loading: true,
  error: {}
}

export default function(state=initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case GET_PRODUCTS:
    case GET_MY_PRODUCTS:
      return {
        ...state,
        products: payload,
        loading: false
      }
      case PRODUCT_ERROR:
        return {
          ...state,
          products: payload,
          loading: false
        }
      default:
        return state;
  }
}