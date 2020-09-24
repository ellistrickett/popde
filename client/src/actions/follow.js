import axios from 'axios';
import { 
  FOLLOW_USER,
  UNFOLLOW_USER,
  FOLLOW_ERROR,
  GET_MY_FOLLOWERS,
  GET_MY_FOLLOWING
} from './types';

// Add like
export const followUser = id => async dispatch => {
  try {
    const res = await axios.put(`/api/user/follow/${id}`);

    dispatch({ 
      type: FOLLOW_USER,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: FOLLOW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}