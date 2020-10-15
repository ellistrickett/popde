import axios from 'axios';
import { 
  FIND_USER, 
  CHAT_ERROR
} from './types';

// Add like
export const findUser = id => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${id}`);

    dispatch({ 
      type: FIND_USER,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: CHAT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}