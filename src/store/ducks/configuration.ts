import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IConfiguration {
  pomodoroTime: number,
  shortRestTime: number,
  longRestTime: number,
  cycles: number,
}

const configurationInitialState: IConfiguration = {
  pomodoroTime: 25,
  shortRestTime: 5,
  longRestTime: 25,
  cycles: 4,
};

const configurationSlice = createSlice({
  name: 'config',
  initialState: configurationInitialState,
  reducers: {
    save: (state, action: PayloadAction<{
      pomodoroTime: number,
      shortRestTime: number,
      longRestTime: number,
      cycles: number,
    }>) => action.payload,
  },
});

export const {
  save: saveConfiguration,
} = configurationSlice.actions;

export default configurationSlice.reducer;
