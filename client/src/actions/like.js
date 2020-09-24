import axios from 'axios';
import _ from 'lodash';
import { 
  LIKE_PRODUCT,
  UNLIKE_PRODUCT,
  PRODUCT_ERROR,
  GET_MY_LIKES,
} from './types';
import { getProduct } from './product';

// Add like
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/products/like/${id}`);

    dispatch({ 
      type: LIKE_PRODUCT,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/products/unlike/${id}`);

    dispatch({ 
      type: UNLIKE_PRODUCT,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// My likes
export const getMyLikes = () => async dispatch => {
  try {
    const res = await axios.get(`/api/products/my/likes`);

    dispatch({ 
      type: GET_MY_LIKES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}