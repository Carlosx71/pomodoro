export interface IGet {
  _id: string;
  fullWorkingTime: number | string;
  numberOfPomodoros: number;
  completedCycles: number;
  data: string;
  email?: string;
};

export interface IPost {
  fullWorkingTime: number | string;
  numberOfPomodoros: number;
  completedCycles: number;
  email: string;
  data: Date;
};
