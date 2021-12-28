import { IConfigurationState } from './types';

const INITIAL_STATE:IConfigurationState = {
  pomodoroTime: 10,
  shortRestTime: 3,
  longRestTime: 5,
  cycles: 2,
};

export function configuration(
  state = INITIAL_STATE,
  action: {type: string, payload: IConfigurationState},
): IConfigurationState {
  switch (action.type) {
    case '@config/SAVE_CONFIGURATION':
      return {
        ...state,
        pomodoroTime: action.payload.pomodoroTime,
        shortRestTime: action.payload.shortRestTime,
        longRestTime: action.payload.longRestTime,
        cycles: action.payload.cycles,
      };
    default:
      return state;
  }
}
