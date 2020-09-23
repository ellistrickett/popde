import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import product from './product';
import likes from './likes';

export default combineReducers({
  alert,
  auth,
  product,
  likes
});