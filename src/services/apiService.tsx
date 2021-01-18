import axios from 'axios';

import { IGet, IPost } from '../pages/PomodoroHistory/interfaces';

const API_URL = 'http://localhost:3001/api/pomodoro';

const getAllPomodoro = async () => {
  const { data } = await axios.get<IGet[]>(API_URL);
  // eslint-disable-next-line
  console.log(data);
  return data;
};

const postPomodoroHistory = async (body: IPost) => {
  const res = await axios.post(API_URL, body);

  if (res.status === 201) {
    return true;
  }
  return false;
};

// const delLine = async (_id) => {
//   const retorno = await axios.delete(API_URL);
//   retorno.status === 200;
// };
export {
  getAllPomodoro,
  postPomodoroHistory,
};
