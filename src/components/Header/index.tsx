import React from 'react';

import {
  AppBar, Grid, IconButton, Toolbar, Typography,
} from '@material-ui/core';
import { AccessAlarm } from '@material-ui/icons';

import MenuItems from './MenuItems';
import { useStyles } from './styles';

const Header: React.FC = () => {
  const classes = useStyles();
  return (
    <AppBar position="relative">
      <Toolbar variant="dense">
        <Grid container direction="row" spacing={3} justify="space-between">
          <Grid item className={classes.icon}>
            <AccessAlarm />
          </Grid>
          <Grid item className={classes.content}>
            <Typography variant="h6">Pomodoro App - MasterClass</Typography>
          </Grid>
          <Grid item>
            <IconButton edge="end">
              <MenuItems />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
