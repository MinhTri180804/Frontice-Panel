import { ISolutionEntity } from "../entity/solution";

export type IGetAllSolutionResponse = {
  solutions: ISolutionEntity[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
};

export type IGetDetailsSolutionResponse = ISolutionEntity;

export type IGetALlSolutionReportResponse = {
  solutions: ISolutionEntity[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
};

export type IGetAllByChallengeIdResponse = {
  solutions: ISolutionEntity[];
  total: number;
  current_page: number;
  per_page: number;
  last_page: number;
};
