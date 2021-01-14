import React from 'react';
import { useSelector } from 'react-redux';

import PomodoroTimer from 'components/PomodoroTimer';
import { StoreState } from 'store/modules';
import { minutesToSecond } from 'utils/minutes-to-second';

const Home: React.FC = () => {
  const {
    pomodoroTime,
    shortRestTime,
    longRestTime,
    cycles,
  } = useSelector((state: StoreState) => state.configuration);
  return (
    <PomodoroTimer
      pomodoroTime={minutesToSecond(pomodoroTime)}
      shortRestTime={minutesToSecond(shortRestTime)}
      longRestTime={minutesToSecond(longRestTime)}
      cycles={minutesToSecond(cycles)}
    />
  );
};

export default Home;
