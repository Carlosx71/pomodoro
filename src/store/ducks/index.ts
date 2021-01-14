import { combineReducers } from '@reduxjs/toolkit';

import configuration from './configuration';
import pomodoro from './pomodoro';

export default combineReducers({
  pomodoro,
  configuration,
});
