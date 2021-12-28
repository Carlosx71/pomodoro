import { IConfigurationState } from './config/types';
import { IPomodoroState } from './pomodoro/types';

export interface StoreState {
  pomodoro: IPomodoroState;
  configuration: IConfigurationState;
};
