import { ITaskEntity } from "../entity/task";

export type IGetAllTaskResponse = {
  tasks: ITaskEntity[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
};

export type IGetTaskDetailsResponse = ITaskEntity & {
  figmaLink: string;
  sourceLink: string;
};
