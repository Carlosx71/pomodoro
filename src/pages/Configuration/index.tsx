import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Paper, TextField } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import FlexContainer from 'components/FlexContainer';
import { useFormik } from 'formik';
import { RootState } from 'store';
import { saveConfiguration } from 'store/ducks/configuration';
import * as yup from 'yup';

import { useStyles } from './styles';

const validationSchema = yup.object({
  pomodoroTime: yup
    .number()
    .positive()
    .integer()
    .required('Qual o tempo do Pomodoro?'),
  shortRestTime: yup
    .number()
    .positive()
    .integer()
    .required('Qual o tempo de Descanso Curto?'),
  longRestTime: yup
    .number()
    .positive('Poh bixo, ai não')
    .integer()
    .required('Qual o tempo de Descanso Longo?'),
  cycles: yup
    .number()
    .positive()
    .integer()
    .required('Quantos Ciclos completados para ter um Descanso Longo?'),
  email: yup
    .string()
    .trim()
    .email('Não é um e-mail válido')
    .required('Favor informar e-mail'),
});

const Configuration: React.FC = () => {
  const {
    pomodoroTime,
    shortRestTime,
    longRestTime,
    cycles,
    email,
  } = useSelector((state:RootState) => state.configuration);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      pomodoroTime,
      shortRestTime,
      longRestTime,
      cycles,
      email,
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(saveConfiguration(values));
    },
  });

  const classes = useStyles();

  return (
    <FlexContainer>
      <Paper className={classes.container}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            className={classes.input}
            fullWidth
            key="input-pomodoroTime"
            variant="outlined"
            id="pomodoroTime"
            name="pomodoroTime"
            label="Tempo do Pomodoro (Min)"
            type="number"
            value={formik.values.pomodoroTime}
            onChange={formik.handleChange}
            error={formik.touched.pomodoroTime && Boolean(formik.errors.pomodoroTime)}
            helperText={formik.touched.pomodoroTime && formik.errors.pomodoroTime}
          />
          <TextField
            className={classes.input}
            fullWidth
            key="input-shortRestTime"
            variant="outlined"
            id="shortRestTime"
            name="shortRestTime"
            label="Tempo do Descanso Curto (Min)"
            type="number"
            value={formik.values.shortRestTime}
            onChange={formik.handleChange}
            error={formik.touched.shortRestTime && Boolean(formik.errors.shortRestTime)}
            helperText={formik.touched.shortRestTime && formik.errors.shortRestTime}
          />
          <TextField
            className={classes.input}
            fullWidth
            key="input-longRestTime"
            variant="outlined"
            id="longRestTime"
            name="longRestTime"
            label="Tempo do Descanso Longo (Min)"
            type="number"
            value={formik.values.longRestTime}
            onChange={formik.handleChange}
            error={formik.touched.longRestTime && Boolean(formik.errors.longRestTime)}
            helperText={formik.touched.longRestTime && formik.errors.longRestTime}
          />
          <TextField
            className={classes.input}
            fullWidth
            key="input-cycles"
            variant="outlined"
            id="cycles"
            name="cycles"
            label="Ciclos de Pomodoro"
            type="number"
            value={formik.values.cycles}
            onChange={formik.handleChange}
            error={formik.touched.cycles && Boolean(formik.errors.cycles)}
            helperText={formik.touched.cycles && formik.errors.cycles}
          />
          <TextField
            className={classes.input}
            fullWidth
            key="input-email"
            variant="outlined"
            id="email"
            name="email"
            label="E-mail"
            type="string"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Button
            className={classes.button}
            startIcon={<Save />}
            id="form-submit"
            type="submit"
          >
            Salvar
          </Button>
        </form>
      </Paper>
    </FlexContainer>
  );
};

export default Configuration;
