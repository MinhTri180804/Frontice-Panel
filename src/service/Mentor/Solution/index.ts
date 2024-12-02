import axiosClient from "../../../axios/axiosClient";
import constantMentorApi from "../../../constants/api/mentor";
import {
  IFeedbackSolutionParams,
  IFeedbackSolutionRequest,
  IGetAllSolutionFeedbackParams,
} from "../../../types/request/mentor/solutionFeedback";
import ISolutionMentorService from "../../../types/services/mentor/solution";

const solutionService: ISolutionMentorService = {
  getAll: (params: IGetAllSolutionFeedbackParams) => {
    const { page, per_page } = params;

    return axiosClient.get(
      `${constantMentorApi.solution.getAll}?page=${page}&per_page=${per_page}`,
    );
  },

  feedback: (
    data: IFeedbackSolutionRequest,
    params: IFeedbackSolutionParams,
  ) => {
    const { solutionId } = params;
    return axiosClient.post(
      `${constantMentorApi.solution.feedback}/${solutionId}`,
      data,
    );
  },
};

export default solutionService;
