import { IBaseResponse } from "../base/response";
import {
  IGetAllSolutionParams,
  IGetAllSolutionResponse,
} from "../request/solution";

export type ISolutionService = {
  getAll: (
    params: IGetAllSolutionParams,
  ) => Promise<IBaseResponse<IGetAllSolutionResponse>>;
};
