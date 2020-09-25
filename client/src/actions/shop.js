import axios from 'axios';
import { 
  GET_SHOP,
  SHOP_ERROR
} from './types';

// Add like
export const getShop = id => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${id}`);

    dispatch({ 
      type: GET_SHOP,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: SHOP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}