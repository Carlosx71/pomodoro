import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IConfiguration {
  pomodoroTime: number,
  shortRestTime: number,
  longRestTime: number,
  cycles: number,
  email: string,
}

const configurationInitialState: IConfiguration = {
  pomodoroTime: 25,
  shortRestTime: 5,
  longRestTime: 25,
  cycles: 4,
  email: '',
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
      email: string,
    }>) => action.payload,
  },
});

export const {
  save: saveConfiguration,
} = configurationSlice.actions;

export default configurationSlice.reducer;
