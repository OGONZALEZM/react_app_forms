import { combineReducers } from 'redux';

import pollReducer from './pollSlice';
import formReducer from './formSlice';

const rootReducer = combineReducers({
  poll: pollReducer,
  form: formReducer,
});

export default rootReducer;