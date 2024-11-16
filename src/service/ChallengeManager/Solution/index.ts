import axiosClient from "../../../axios/axiosClient";
import constantChallengeManagerApi from "../../../constants/api/challengeManager";
import { IGetAllSolutionParams } from "../../../types/request/solution";
import { ISolutionService } from "../../../types/services/solutionService";

const solutionService: ISolutionService = {
  getAll: (params: IGetAllSolutionParams) => {
    const { page = 1, per_page = 10 } = params;
    return axiosClient.get(
      `${constantChallengeManagerApi.solution.getAll}?page=${page}&per_page=${per_page}`,
    );
  },
};

export default solutionService;
