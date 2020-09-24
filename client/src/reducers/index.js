import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import product from './product';
import like from './like';

export default combineReducers({
  alert,
  auth,
  product,
  like
});