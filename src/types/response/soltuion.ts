import { IChallengeEntity } from "../entity/challenge";
import { ISolutionEntity } from "../entity/solution";

export type IGetAllSolutionResponse = {
  solutions: ISolutionEntity[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
};

export type IGetDetailsSolutionResponse = ISolutionEntity;
