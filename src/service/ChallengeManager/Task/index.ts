import axiosClient from "../../../axios/axiosClient";
import constantChallengeManagerApi from "../../../constants/api/challengeManager";
import {
  IGetAllTaskParams,
  IGetDetailsTaskParams,
} from "../../../types/request/task";
import { ITaskService } from "../../../types/services/taskService";

const taskService: ITaskService = {
  getAll: (params: IGetAllTaskParams) => {
    const { page = 1, per_page = 10 } = params;
    return axiosClient.get(
      `${constantChallengeManagerApi.task.getAll}?page=${page}&per_page=${per_page}`,
    );
  },

  getDetails: (params: IGetDetailsTaskParams) => {
    const { taskId } = params;
    return axiosClient.get(
      `${constantChallengeManagerApi.task.details}/${taskId}`,
    );
  },
};

export default taskService;
