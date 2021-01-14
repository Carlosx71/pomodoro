import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const linearStyle = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
