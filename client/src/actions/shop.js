import axios from 'axios';
import { 
  GET_SHOP,
  SHOP_ERROR,
  GET_FOLLOWERS_BY_SHOP,
  GET_FOLLOWING_BY_SHOP,
  GET_LIKES_BY_SHOP,
  FOLLOW_ERROR
} from './types';

// Get shop
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

// Get shops following
export const getFollowingByShop = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/users/following/${id}`);

    dispatch({ 
      type: GET_FOLLOWING_BY_SHOP,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: FOLLOW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Get shops followers
export const getFollowersByShop = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/users/followers/${id}`);

    dispatch({ 
      type: GET_FOLLOWERS_BY_SHOP,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: FOLLOW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Get shops likes
export const getLikesByShop = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/products/likes/${id}`);

    dispatch({ 
      type: GET_LIKES_BY_SHOP,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: FOLLOW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

