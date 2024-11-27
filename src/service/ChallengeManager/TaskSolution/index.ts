import axiosClient from "../../../axios/axiosClient";
import constantChallengeManagerApi from "../../../constants/api/challengeManager";
import {
  IGetAllTaskSolutionParams,
  IGetSolutionByTaskIdParams,
} from "../../../types/request/solution";
import { IGetSolutionsByTaskIdResponse } from "../../../types/response/soltuion";
import { ITaskSolutionService } from "../../../types/services/taskSolutionService";

const taskSolutionService: ITaskSolutionService = {
  getAll: (params: IGetAllTaskSolutionParams) => {
    const { page, perPage } = params;
    return axiosClient.get(
      `${constantChallengeManagerApi.taskSolution.getAll}?page=${page}&per_page=${perPage}`,
    );
  },

  getByIdTask: (params: IGetSolutionByTaskIdParams) => {
    const { taskId, page = 1, perPage = 10 } = params;
    return axiosClient.get(
      `${constantChallengeManagerApi.taskSolution.getByTaskId}/${taskId}/solutions?page=${page}&per_page=${perPage}`,
    );
  },
};

export default taskSolutionService;
