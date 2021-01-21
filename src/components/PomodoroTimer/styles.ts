import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { IPomodoroStyles } from './interfaces';

export const PomodoroTimerStyle = makeStyles<Theme, IPomodoroStyles>(
  ({ palette, spacing }:Theme) => ({
    title: (props) => ({
      textAlign: 'center',
      backgroundColor: props.isWorking ? palette.primary.main : palette.secondary.main,
      color: palette.common.white,
    }),
    content: {
      textAlign: 'center',
    },
    buttons: {
      flex: 1,
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: spacing(1),
        width: spacing(12),
        height: spacing(11),
      }
    },

    bottonNav: {
      width: 500,
    },
  })
);

export const useStylesStep = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}),);
