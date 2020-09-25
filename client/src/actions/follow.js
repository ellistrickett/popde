import axios from 'axios';
import { 
  FOLLOW_USER,
  UNFOLLOW_USER,
  FOLLOW_ERROR,
  GET_MY_FOLLOWERS,
  GET_MY_FOLLOWING
} from './types';

// Follow user
export const followUser = id => async dispatch => {
  try {
    const res = await axios.put(`/api/users/follow/${id}`);

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

// Unfollow user
export const unfollowUser = id => async dispatch => {
  try {
    const res = await axios.put(`/api/users/unfollow/${id}`);

    dispatch({ 
      type: UNFOLLOW_USER,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: FOLLOW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Get my followers
export const getMyFollowers = id => async dispatch => {
  try {
    const res = await axios.get('/api/users/my/followers');

    dispatch({ 
      type: GET_MY_FOLLOWERS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: FOLLOW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Get my following
export const getMyFollowing = id => async dispatch => {
  try {
    const res = await axios.get('/api/users/my/following');

    dispatch({ 
      type: GET_MY_FOLLOWING,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: FOLLOW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}