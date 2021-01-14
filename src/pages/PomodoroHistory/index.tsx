import React, { useEffect, useState } from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';
import MaterialTable from 'material-table';

import { IGet } from './interfaces';
import { linearStyle } from './styles';

import { getAllPomodoro } from '../../services/apiService';

// interface IGet {
//   _id?: string;
//   totalOfPomodoros: number;
//   totalWorkingTime: number;
//   totalCycles: number;
// };

const PomodoroHistory: React.FC = () => {
  const [pomodoroHistoryApi, setPomodoroHistoryApi] = useState<IGet[]>([]);

  useEffect(() => {
    const getHistoryPomodoro = async (): Promise<void> => {
      const pomodoroAll = await getAllPomodoro();
      setTimeout(() => {
        setPomodoroHistoryApi(pomodoroAll);
      }, 2000);
    };

    getHistoryPomodoro();
  }, []);

  const classes = linearStyle();
  return (
    <>
      {pomodoroHistoryApi.length === 0 && (
      <div className={classes.root}>
        <LinearProgress />
        <LinearProgress color="secondary" />
      </div>
      )}

      {pomodoroHistoryApi.length > 0 && (
      <MaterialTable
        title="Histórico de Pomodoros"
        columns={[
          { title: 'Pomodoros', field: 'totalOfPomodoros' },
          { title: 'Horas Totais', field: 'totalWorkingTime' },
          { title: 'Ciclos de Pomodoro', field: 'totalCycles' },
          { title: 'Data', field: 'data' },
          // {
          //   title: 'Birth Place',
          //   field: 'birthCity',
          //   lookup: { 34: 'İstanbul', 63: 'Şanlıurfa', 70: 'bolinha preta' },
          // },
        ]}
        data={pomodoroHistoryApi}
        actions={[
          {
            icon: 'delete',
            tooltip: 'Deletar Histórico',
            // eslint-disable-next-line
            onClick: (event) => alert('Deleta essa treta '),
          },
          // (rowData) => ({
          //   icon: 'delete',
          //   tooltip: 'Delete User',
          //   onClick: (event) => confirm('You want to delete '),
          // disabled: rowData.birthYear < 2000,
          // }),
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
      />
      )}
    </>
  );
};

export default PomodoroHistory;
