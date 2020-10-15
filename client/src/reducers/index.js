import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import product from './product';
import like from './like';
import follow from './follow';
import shop from './shop';
import chat from './chat';

export default combineReducers({
  alert,
  auth,
  product,
  like,
  follow,
  shop,
  chat
});