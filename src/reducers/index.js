import { combineReducers } from 'redux';

import environment from './environment';
import font from './font';

const rootReducer = combineReducers({
  environment, font,
});

export default rootReducer;
