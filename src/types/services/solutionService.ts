import { IBaseResponse } from "../base/response";
import {
  IGetAllSolutionParams,
  IGetDetailsSolutionParams,
} from "../request/solution";
import {
  IGetAllSolutionResponse,
  IGetDetailsSolutionResponse,
} from "../response/soltuion";

export type ISolutionService = {
  getAll: (
    params: IGetAllSolutionParams,
  ) => Promise<IBaseResponse<IGetAllSolutionResponse>>;
  getDetails: (
    params: IGetDetailsSolutionParams,
  ) => Promise<IBaseResponse<IGetDetailsSolutionResponse>>;
};
