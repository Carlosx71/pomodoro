import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IPomodoroSummary {
  totalCycles: number,
  totalOfPomodoros: number,
  totalWorkingTime: number,
}

interface SavePayloadAction {
  totalCycles: number,
  totalOfPomodoros: number,
  totalWorkingTime: number,
}

const pomodoroInitialState: IPomodoroSummary = {
  totalCycles: 0,
  totalOfPomodoros: 0,
  totalWorkingTime: 0,
};

const pomodoroSlice = createSlice({
  name: 'pomodoro',
  initialState: pomodoroInitialState,
  reducers: {
    save: (state, action: PayloadAction<SavePayloadAction>) => action.payload,
  },
});

export const {
  save: savePomodoroSummary,
} = pomodoroSlice.actions;

export default pomodoroSlice.reducer;
