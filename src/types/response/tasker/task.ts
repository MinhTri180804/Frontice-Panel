type ITask = {
  id: string;
  title: string;
  owner: {
    username: string;
    firstname: string;
    lastname: string;
    image: string;
    url: string;
    company: string;
  };
  technical: string[];
  image: string;
  requiredPoint: number;
  shortDes: string;
  joinTotal: number;
  submittedTotal: number;
  expiredAt: number;
  created_at: number;
  updated_at: number;
};

export type IGetAllTaskResponse = {
  tasks: ITask[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
};
