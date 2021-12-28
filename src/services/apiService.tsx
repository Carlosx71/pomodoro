import axios from 'axios';

import { IGet, IPost } from '../pages/PomodoroHistory/interfaces';

const API_URL = 'http://localhost:3001/api/pomodoro';
// GET
const getAllPomodoro = async () => {
  try {
    const res = await axios.get<IGet[]>(API_URL);
    const { data, status } = res;
    const dados: IGet[] = data;
    // eslint-disable-next-line
    console.log(status);
    if (status === 200 && data.length > 0) {
      return { dados, loadingValue: true };
    }
    return { dados, loadingValue: false };
  } catch (error) {
    // eslint-disable-next-line
    console.log(`Erro ao buscar dados do histórico: ${error}`);
    return { dados: [], loadingValue: false };
  }
};

const getPomodoroByEmail = async (email: string) => {
  try {
    const res = await axios.get<IGet[]>(`${API_URL}/${email}`);
    const { data, status } = res;
    const dados: IGet[] = data;
    // eslint-disable-next-line
    if (status === 200 && data.length > 0) {
      return { dados, loadingValue: true };
    }
    return { dados, loadingValue: false };
  } catch (error) {
    // eslint-disable-next-line
    console.log(`Erro ao buscar dados do histórico: ${error}`);
    return { dados: [], loadingValue: false };
  }
};

// POST
const postPomodoroHistory = async (body: IPost) => {
  const res = await axios.post(API_URL, body);

  if (res.status === 201) {
    return true;
  }
  return false;
};

// DEL
const delLinePomodoroHistory = async (_id: string) => {
  try {
    const { status } = await axios.delete(`${API_URL}/${_id}`);
    if (status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    // eslint-disable-next-line
    console.log(`Error ao deletar por id: ${error}`);
    return false;
  }
  // retorno.status === 200;
};

export {
  getAllPomodoro,
  postPomodoroHistory,
  delLinePomodoroHistory,
  getPomodoroByEmail,
};
