import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import LinearProgress from '@material-ui/core/LinearProgress';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home';
import MaterialTable from 'material-table';
import { RootState } from 'store';

import { IGet } from './interfaces';
import { useStyles, StyledBreadcrumb, useBreadcrumbsStyle } from './styles';

import {
  delLinePomodoroHistory,
  getPomodoroByEmail,
} from '../../services/apiService';
import { secondsToTime } from '../../utils/seconds-to-time';

const PomodoroHistory: React.FC = () => {
  const [pomodoroHistoryApi, setPomodoroHistoryApi] = useState<IGet[]>([]);
  const [showLoading, setLoading] = useState(true);
  const [showTab, setShowTab] = useState(false);
  const pages = {
    home: {
      pageURL: '/',
    },
    pomodoroHistory: {
      pageURL: '/pomodoroHistory',
    },
  };
  const { email } = useSelector((state: RootState) => state.configuration);
  const handleRouterClickBrumb = (
    // event: React.MouseEvent<Element, MouseEvent>,
    page: string
  ) => {
    history.push(page);
  };

  useEffect(() => {
    const getHistoryPomodoro = async (): Promise<void> => {
      // let pomodoroAll = await getAllPomodoro();
      const { dados } = await getPomodoroByEmail(email);
      // const { dados } = await getAllPomodoro();
      const pomodoroAll = dados.map(
        ({
          numberOfPomodoros,
          fullWorkingTime,
          completedCycles,
          data,
          _id,
        }) => ({
          _id,
          numberOfPomodoros,
          fullWorkingTime: secondsToTime(+fullWorkingTime),
          completedCycles,
          data: new Intl.DateTimeFormat('pt-BR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          }).format(new Date(data)),
        })
      );
      setTimeout(() => {
        if (dados.length >= 0) {
          setLoading(false);
          setShowTab(true);
        }
        setPomodoroHistoryApi(pomodoroAll);
      }, 1000);
    };

    getHistoryPomodoro();
  }, [pomodoroHistoryApi, email]);
  const history = useHistory();
  const classes = useStyles();
  const breadCrumbsStyles = useBreadcrumbsStyle();
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" className={breadCrumbsStyles.root}>
        <StyledBreadcrumb
          component="a"
          label="Home"
          icon={<HomeIcon fontSize="small" />}
          onClick={() => handleRouterClickBrumb(pages.home.pageURL)}
        />
        <StyledBreadcrumb
          component="b"
          label="Histórico de Pomodoros"
          onClick={() => handleRouterClickBrumb(pages.pomodoroHistory.pageURL)}
        />
      </Breadcrumbs>

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
            {
              title: 'Ciclos de Pomodoro',
              field: 'completedCycles',
            },
            { title: 'Data', field: 'data' },
            {
              title: 'Birth Place',
              field: 'birthCity',
              lookup: {
                34: 'İstanbul',
                63: 'Şanlıurfa',
                70: 'bolinha preta',
              },
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
