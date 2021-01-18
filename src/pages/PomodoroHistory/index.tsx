import React, { useEffect, useState } from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';
import MaterialTable from 'material-table';

import { IGet } from './interfaces';
import { useStyles } from './styles';

import { getAllPomodoro, delLinePomodoroHistory } from '../../services/apiService';
import { secondsToTime } from '../../utils/seconds-to-time';

const PomodoroHistory: React.FC = () => {
  const [pomodoroHistoryApi, setPomodoroHistoryApi] = useState<IGet[]>([]);
  const [showLoading, setLoading] = useState(true);
  const [showTab, setShowTab] = useState(false);
  useEffect(() => {
    const getHistoryPomodoro = async (): Promise<void> => {
      // let pomodoroAll = await getAllPomodoro();
      const { dados } = await getAllPomodoro();
      const pomodoroAll = dados.map(({
        numberOfPomodoros, fullWorkingTime, completedCycles, data, _id,
      }) => ({
        _id,
        numberOfPomodoros,
        fullWorkingTime: secondsToTime(+fullWorkingTime),
        completedCycles,
        data: new Intl.DateTimeFormat('pt-BR', {
          year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',
        }).format(new Date(data)),
      }
      ));
      setTimeout(() => {
        if (dados.length >= 0) {
          setLoading(false);
          setShowTab(true);
        }
        setPomodoroHistoryApi(pomodoroAll);
      }, 1000);
    };

    getHistoryPomodoro();
  }, [pomodoroHistoryApi]);

  const classes = useStyles();
  return (
    <>
      {showLoading && (
      <div className={classes.root}>
        <LinearProgress />
        <LinearProgress color="secondary" />
      </div>
      )}

      {showTab && (
      <MaterialTable
        title="Histórico de Pomodoros"
        columns={[
          { title: 'Pomodoros', field: 'numberOfPomodoros' },
          { title: 'Horas Totais', field: 'fullWorkingTime' },
          { title: 'Ciclos de Pomodoro', field: 'completedCycles' },
          { title: 'Data', field: 'data' },
          {
            title: 'Birth Place',
            field: 'birthCity',
            lookup: { 34: 'İstanbul', 63: 'Şanlıurfa', 70: 'bolinha preta' },
          },
        ]}
        data={pomodoroHistoryApi}
        actions={[
          // {
          //   icon: 'delete',
          //   tooltip: 'Deletar Histórico',
          //   // eslint-disable-next-line
          //   onClick: (event) => console.log(event),
          // },
          (rowData) => ({
            icon: 'delete',
            tooltip: 'Deleta linha de histórico',
            // eslint-disable-next-line
            onClick: (event) => delLinePomodoroHistory(rowData._id),
            // disabled: rowData.completedCycles > 2000,
          }),
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
