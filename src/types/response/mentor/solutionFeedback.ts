import { ISolutionFeedbackEntity } from "../../entity/solution";

export interface IGetAllSolutionFeedbackResponse {
  solutions: ISolutionFeedbackEntity[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
}
