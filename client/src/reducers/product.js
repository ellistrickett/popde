import {
  GET_PRODUCTS,
  PRODUCT_ERROR,
  GET_MY_PRODUCTS,
  GET_PRODUCT, 
  GET_PRODUCTS_BY_SHOP
} from '../actions/types';

const initialState = {
  products: [],
  selectedProduct: null,
  loading: true,
  error: {}
}

export default function(state=initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case GET_PRODUCTS:
    case GET_MY_PRODUCTS:
    case GET_PRODUCTS_BY_SHOP:
      return {
        ...state,
        products: payload,
        loading: false
      }
    case GET_PRODUCT:
      return {
        ...state,
        selectedProduct: payload,
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