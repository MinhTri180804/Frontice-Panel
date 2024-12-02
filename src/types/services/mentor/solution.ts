import { IBaseResponse } from "../../base/response";
import {
  IFeedbackSolutionParams,
  IFeedbackSolutionRequest,
  IGetAllSolutionFeedbackParams,
} from "../../request/mentor/solutionFeedback";
import { IGetAllSolutionFeedbackResponse } from "../../response/mentor/solutionFeedback";

type ISolutionMentorService = {
  getAll: (
    params: IGetAllSolutionFeedbackParams,
  ) => Promise<IBaseResponse<IGetAllSolutionFeedbackResponse>>;

  feedback: (
    data: IFeedbackSolutionRequest,
    params: IFeedbackSolutionParams,
  ) => Promise<IBaseResponse<null>>;
};

export default ISolutionMentorService;
