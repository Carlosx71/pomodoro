import { IPomodoroState } from './types';

const INITIAL_STATE: IPomodoroState = {
  totalCycles: 0,
  totalWorkingTime: 0,
  totalOfPomodoros: 0,
};

export function pomodoro(
  state = INITIAL_STATE,
  action: {type: string, payload: IPomodoroState},
):IPomodoroState {
  switch (action.type) {
    case '@pomodoro/SAVE_POMODORO_SUMMARY':
      return {
        ...state,
        totalCycles: action.payload.totalCycles,
        totalWorkingTime: action.payload.totalWorkingTime,
        totalOfPomodoros: action.payload.totalOfPomodoros,
      };
    default:
      return state;
  }
}
