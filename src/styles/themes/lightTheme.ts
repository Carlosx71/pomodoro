import { createMuiTheme } from '@material-ui/core/styles';

// Create a light Theme
export const lightTheme = createMuiTheme({
  props: {
    MuiButton: {
      variant: 'contained',
      color: 'primary',
    },
  },
  palette: {
    primary: {
      main: '#361466',
    },
    secondary: {
      main: '#5D22AB',
    },
  },
  overrides: {
    MuiIconButton: {
      root: {
        color: 'inherit',
      },
    },
  },
});
