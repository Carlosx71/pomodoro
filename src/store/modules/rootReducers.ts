import { combineReducers } from 'redux';

import { configuration } from './config/reducer';
import { pomodoro } from './pomodoro/reducer';

import { StoreState } from '.';

export default combineReducers<StoreState>({
  pomodoro,
  configuration,
});
