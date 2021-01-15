import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button, Card, CardActions, CardContent, CardHeader, Collapse, Grid, IconButton,
} from '@material-ui/core';
import {
  Pause, PlayArrow, Save, Stop,
} from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';
import FlexContainer from 'components/FlexContainer';
import { Timer } from 'components/Timer';
import { useInterval } from 'hooks/use-interval';
import { RootState } from 'store';
import { savePomodoroSummary } from 'store/ducks/pomodoro';
import { secondsToTime } from 'utils/seconds-to-time';

import { IPomodoroStyles, IPomodoroTimerProps } from './interfaces';
import { PomodoroTimerStyle } from './styles';
// import IconButton from '@material-ui/core/IconButton';

export default function PomodoroTimer(props: IPomodoroTimerProps): JSX.Element {
  const {
    pomodoroTime,
    shortRestTime,
    longRestTime,
    cycles,
  } = props;

  const {
    totalCycles,
    totalOfPomodoros,
    totalWorkingTime,
  } = useSelector((state: RootState) => state.pomodoro);

  const { email } = useSelector((state: RootState) => state.configuration);
  // console.log(totalCycles, totalOfPomodoros, totalWorkingTime);

  const dispatch = useDispatch();
  const [mainTime, setMainTime] = useState(pomodoroTime);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [cyclesQtdManager, setCyclesQtdManager] = useState(
    new Array(cycles - 1).fill(true),
  );
  const [open, setOpen] = useState(false);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  const styledProps: IPomodoroStyles = { isWorking: working };
  const classes = PomodoroTimerStyle(styledProps);
  useInterval(() => {
    setMainTime(mainTime - 1);
    if (working) setFullWorkingTime(fullWorkingTime + 1);
  }, timeCounting ? 1000 : null);

  const handleWorkStart = useCallback(() => {
    if (email !== '') {
      setTimeCounting(true);
      setWorking(true);
      setMainTime(pomodoroTime);
    } else {
      setOpen(true);
    }
  }, [pomodoroTime, email]);

  const handlePlayPause = useCallback(() => {
    setTimeCounting(!timeCounting);
  }, [timeCounting]);

  const handleRestStart = useCallback(
    (long: boolean) => {
      setTimeCounting(true);
      setWorking(false);
      setResting(true);

      if (long) {
        setMainTime(longRestTime);
      } else {
        setMainTime(shortRestTime);
      }
    }, [longRestTime, shortRestTime],
  );

  // const canSave = useCallback(() => {
  //   const can = !!(((!working && !resting && !timeCounting)
  //   && (fullWorkingTime > 0)));

  //   return can;
  // }, [fullWorkingTime, resting, timeCounting, working]);

  const handleStop = useCallback(() => {
    setStopped(true);
    setTimeCounting(false);
    setWorking(false);
    setResting(false);
    setMainTime(pomodoroTime);

    try {
      if (working === true) {
        dispatch(savePomodoroSummary({
          totalCycles: totalCycles + completedCycles,
          totalOfPomodoros: totalOfPomodoros + numberOfPomodoros,
          totalWorkingTime: totalWorkingTime + fullWorkingTime,
        }));
      } else {
        throw new Error('Não foi possível salvar no store');
      }
    } catch (error) {
      console.log(error);
    }
  }, [pomodoroTime,
    completedCycles,
    dispatch,
    fullWorkingTime,
    numberOfPomodoros,
    totalCycles,
    totalOfPomodoros,
    totalWorkingTime]);

  // const handleSave = useCallback(() => {
  //   try {
  //     dispatch(savePomodoroSummary({
  //       totalCycles: totalCycles + completedCycles,
  //       totalOfPomodoros: totalOfPomodoros + numberOfPomodoros,
  //       totalWorkingTime: totalWorkingTime + fullWorkingTime,
  //     }));
  //   } catch (error) {
  //     throw new Error('Não foi possível salvar no store');
  //   }
  // }, [
  //   completedCycles,
  //   dispatch,
  //   fullWorkingTime,
  //   numberOfPomodoros,
  //   totalCycles,
  //   totalOfPomodoros,
  //   totalWorkingTime,
  // ]);

  useEffect(() => {
    if (mainTime > 0) return;

    if (working && cyclesQtdManager.length > 0) {
      handleRestStart(false);
      cyclesQtdManager.pop();
    } else if (working && cyclesQtdManager.length <= 0) {
      handleRestStart(true);
      setCyclesQtdManager(new Array(cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (resting) handleWorkStart();
  }, [
    mainTime,
    completedCycles,
    cycles,
    cyclesQtdManager,
    handleRestStart,
    handleWorkStart,
    numberOfPomodoros,
    resting,
    working,
  ]);

  return (
    <FlexContainer>
      <Card>
        <CardHeader
          title={working ? 'Você está: Trabalhando' : 'Você está: Descansando'}
        />
        <CardContent className={classes.content}>
          <Grid container justify="space-around" spacing={3}>
            <Grid item>
              <Timer mainTime={mainTime} />
            </Grid>
            <Grid item>
              <Grid container spacing={3} direction="column" justify="flex-end">
                <Grid item>
                  <Card elevation={2}>
                    <CardHeader title="Ciclos" />
                    <CardContent>{completedCycles}</CardContent>
                  </Card>
                </Grid>
                <Grid item>
                  <Card elevation={2}>
                    <CardHeader title="Horas Totais" />
                    <CardContent>{secondsToTime(fullWorkingTime)}</CardContent>
                  </Card>
                </Grid>
                <Grid item>
                  <Card elevation={2}>
                    <CardHeader title="Pomodoros" />
                    <CardContent>{numberOfPomodoros}</CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

        </CardContent>
        <CardActions className={classes.buttons}>
          <div className={classes.root}>
            <Collapse in={open}>
              <Alert
                severity="error"
                action={(
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
          )}
              >
                E-mail não informado. Verifique as configurações
              </Alert>
            </Collapse>
          </div>
        </CardActions>
        <CardActions className={classes.buttons}>
          <Button onClick={handleWorkStart}>Trabalhar</Button>
          <Button onClick={() => { handleRestStart(false); }}>Descansar</Button>
          <Button
            disabled={!working && !resting}
            onClick={handlePlayPause}
          >
            {
              timeCounting ? <Pause /> : <PlayArrow />
            }
          </Button>
          <Button onClick={handleStop}><Stop /></Button>
          {/* <Button
            startIcon={<Save />}
            disabled={!stopped}
            onClick={handleSave}
          >
            Salvar
          </Button> */}
        </CardActions>

      </Card>
    </FlexContainer>
  );
}
