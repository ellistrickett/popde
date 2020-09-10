import axios from 'axios';
import { setAlert } from './alert';
import { 
  GET_PRODUCTS,
  PRODUCT_ERROR
} from './types';

// Get products
export const getProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products');

    dispatch({ 
      type: GET_PRODUCTS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}