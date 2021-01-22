import React from 'react';

import { Typography } from '@material-ui/core';
import { secondsToMinutes } from 'utils/seconds-to-minutes';
import { zeroLeft } from 'utils/zero-left';

// import { Container } from './styles';

interface Props {
  mainTime: number;
  working: boolean;
}

export function Timer(props: Props): JSX.Element {
  const { mainTime, working } = props;

  const childrenCountDown = (remainingTime: number): string => {
    const hours = zeroLeft(Math.floor(remainingTime / 3600));
    const minutes = zeroLeft(Math.floor((remainingTime % 3600) / 60));
    const seconds = zeroLeft(remainingTime % 60);
    return `${minutes}:${seconds}`;
  };

  return (
    <Typography variant="button" display="block" gutterBottom>
      {childrenCountDown(mainTime)}
      <br />
      {working ? 'Trabalhando' : 'Descansando'}
    </Typography>
  );
}
