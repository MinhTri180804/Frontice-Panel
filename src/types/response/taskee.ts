import { ITaskeeEntity } from "../entity/taskee";

export type IGetAllTaskeeInChallengeResponse = {
  taskees: ITaskeeEntity[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
};
