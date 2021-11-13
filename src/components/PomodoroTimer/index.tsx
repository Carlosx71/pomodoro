/* eslint-disable object-curly-newline */
import React, { useCallback, useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
  Tooltip,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  ButtonGroup,
} from '@material-ui/core';
import { Pause, PlayArrow, Stop } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import HotelIcon from '@material-ui/icons/Hotel';
import WorkIcon from '@material-ui/icons/Work';
import { Alert } from '@material-ui/lab';
import FlexContainer from 'components/FlexContainer';
// import { Timer } from 'components/Timer';
import { Timer } from 'components/Timer';
import { useInterval } from 'hooks/use-interval';
import { RootState } from 'store';
import { savePomodoroSummary } from 'store/ducks/pomodoro';
import { secondsToTime } from 'utils/seconds-to-time';

import { IPomodoroStyles, IPomodoroTimerProps } from './interfaces';
import { PomodoroTimerStyle, useStylesStep } from './styles';

// import { IPost } from '../../pages/PomodoroHistory/interfaces';
import { postPomodoroHistory } from '../../services/apiService';
import { zeroLeft } from '../../utils/zero-left';

const getStepContent = (stepIndex: number) => {
  switch (stepIndex) {
    case 0:
      return 'Trabalhando';
    case 1:
      return 'Descansando';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown stepIndex';
  }
};

export default function PomodoroTimer(props: IPomodoroTimerProps): JSX.Element {
  const { pomodoroTime, shortRestTime, longRestTime, cycles } = props;

  const { totalCycles, totalOfPomodoros, totalWorkingTime } = useSelector(
    (state: RootState) => state.pomodoro
  );

  const { email } = useSelector((state: RootState) => state.configuration);
  // console.log(totalCycles, totalOfPomodoros, totalWorkingTime);
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const [mainTime, setMainTime] = useState(pomodoroTime);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [cyclesQtdManager, setCyclesQtdManager] = useState(
    new Array(cycles - 1).fill(true)
  );
  const [open, setOpen] = useState(false);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  const styledProps: IPomodoroStyles = { isWorking: working };
  const classes = PomodoroTimerStyle(styledProps);

  const steps = ['Trabalhando', 'Desacansando', 'Create an ad'];

  // const classeStep = useStylesStep();
  const [activeStep, setActiveStep] = useState(0);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCounting ? 1000 : null
  );

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
    },
    [longRestTime, shortRestTime]
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
    const pomodoroResPost = async () => {
      const res = await postPomodoroHistory({
        email,
        completedCycles,
        numberOfPomodoros,
        fullWorkingTime,
        data: new Date(),
      });
      return res;
    };
    try {
      if (working === true) {
        dispatch(
          savePomodoroSummary({
            totalCycles: totalCycles + completedCycles,
            totalOfPomodoros: totalOfPomodoros + numberOfPomodoros,
            totalWorkingTime: totalWorkingTime + fullWorkingTime,
          })
        );

        pomodoroResPost();
      } else {
        throw new Error('Não foi possível salvar no store');
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
  }, [
    pomodoroTime,
    completedCycles,
    dispatch,
    fullWorkingTime,
    numberOfPomodoros,
    totalCycles,
    totalOfPomodoros,
    totalWorkingTime,
    working,
    email,
  ]);

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

  const childrenCountDown = (remainingTime: number): string => {
    const hours = zeroLeft(Math.floor(remainingTime / 3600));
    const minutes = zeroLeft(Math.floor((remainingTime % 3600) / 60));
    const seconds = zeroLeft(remainingTime % 60);
    return `${minutes}:${seconds}`;
  };

  return (
    <FlexContainer>
      <Card>
        <CardHeader
          title={working ? 'Você está: Trabalhando' : 'Você está: Descansando'}
        />

        <CardContent className={classes.content}>
          <Grid container direction="column" spacing={3} justify="center">
            <Grid item>
              <Grid container justify="center">
                <Grid item>
                  <CountdownCircleTimer
                    size={240}
                    onComplete={
                      () => [working, mainTime] // repeat animation
                    }
                    initialRemainingTime={mainTime}
                    isPlaying={working}
                    duration={mainTime}
                    colors={[
                      ['#004777', 0.33],
                      ['#F7B801', 0.33],
                      ['#A30000', 0.33],
                    ]}
                  >
                    {(remainingTime) => (
                      <Timer mainTime={mainTime} working={working} />
                    )}
                  </CountdownCircleTimer>
                  {/* <Timer mainTime={mainTime} /> */}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container justify="center" spacing={1}>
                <Grid item>
                  <Tooltip title="Ciclos de pomodoros" arrow>
                    <Paper elevation={2} className={classes.paper}>
                      <div>
                        <Typography
                          variant="button"
                          display="block"
                          gutterBottom
                        >
                          {completedCycles}
                        </Typography>
                        <Typography
                          variant="button"
                          display="block"
                          gutterBottom
                        >
                          Ciclos
                        </Typography>
                      </div>
                    </Paper>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Paper elevation={2} className={classes.paper}>
                    <div>
                      <Typography variant="button" display="block" gutterBottom>
                        {secondsToTime(fullWorkingTime)}
                      </Typography>
                      <Typography variant="button" display="block" gutterBottom>
                        Horas Totais
                      </Typography>
                    </div>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper elevation={2} className={classes.paper}>
                    <div>
                      <Typography variant="button" display="block" gutterBottom>
                        {numberOfPomodoros}
                      </Typography>
                      <Typography variant="button" display="block" gutterBottom>
                        Pomodoros
                      </Typography>
                    </div>
                  </Paper>
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
                action={
                  // eslint-disable-next-line react/jsx-wrap-multilines
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
                }
              >
                E-mail não informado. Verifique as configurações
              </Alert>
            </Collapse>
          </div>
        </CardActions>
        <CardActions className={classes.buttons}>
          <ButtonGroup>
            <Tooltip title="Vai trabalhar vagabundo" arrow>
              <IconButton onClick={handleWorkStart}>
                <WorkIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Descansar" arrow>
              <IconButton
                onClick={() => {
                  handleRestStart(false);
                }}
              >
                <HotelIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Tá querendo ir vagabundar né?" arrow>
              <IconButton
                disabled={!working && !resting}
                onClick={handlePlayPause}
              >
                {timeCounting ? <Pause /> : <PlayArrow />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Deixa de ser preguiçoso" arrow>
              <IconButton color="primary" onClick={handleStop}>
                <Stop />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
          {/* <Button
            startIcon={<Save />}
            disabled={!stopped}
            onClick={handleSave}
          >
            Salvar
          </Button> */}
        </CardActions>
      </Card>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.bottonNav}
      >
        <BottomNavigationAction label="Recents" icon={<PlayArrow />} />
        <BottomNavigationAction label="Favorites" icon={<Pause />} />
        <BottomNavigationAction label="Nearby" icon={<Stop />} />
      </BottomNavigation>
    </FlexContainer>
  );
}
