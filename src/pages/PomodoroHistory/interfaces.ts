export interface IGet {
  _id?: string;
  fullWorkingTime: number;
  numberOfPomodoros: number;
  completedCycles: number;
  data: string;
  email?: string;
};

export interface IPost {
  fullWorkingTime: number;
  numberOfPomodoros: number;
  completedCycles: number;
  email: string;
};
