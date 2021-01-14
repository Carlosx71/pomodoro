type TConfiguration = {
  pomodoroTime: number,
  shortRestTime: number,
  longRestTime: number,
  cycles: number,
}

export function saveConfiguration({
  pomodoroTime,
  shortRestTime,
  longRestTime,
  cycles,
}: TConfiguration): { type: string, payload: TConfiguration} {
  return {
    type: '@config/SAVE_CONFIGURATION',
    payload: {
      pomodoroTime,
      shortRestTime,
      longRestTime,
      cycles,
    },
  };
}
