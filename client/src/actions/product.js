import axios from 'axios';
import { setAlert } from './alert';
import { 
  GET_PRODUCTS,
  PRODUCT_ERROR,
  GET_MY_PRODUCTS,
  GET_PRODUCT,
  UPDATE_LIKES
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

// Get my products
export const getMyProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products/my');

    dispatch({ 
      type: GET_MY_PRODUCTS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}


// Create or update product
export const createProduct = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/products', formData, config)

    dispatch({ 
      type: GET_PRODUCTS,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Product Updated' : 'Product Created'));

    if(!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const error = err.response.data.errors

    if (error) {
      error.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Get product
export const getProduct = id => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${id}`);

    dispatch({ 
      type: GET_PRODUCT,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}