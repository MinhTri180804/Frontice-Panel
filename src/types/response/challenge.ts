import { IChallengeEntity } from "../entity/challenge";

export type IGetAllChallengeResponse = {
  challenges: IChallengeEntity[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
};

export type IUploadImageChallengeResponse = {
  path: string;
};

export type IUploadSourceChallengeResponse = {
  path: string;
};

export type IUploadFigmaChallengeResponse = {
  path: string;
};

export type IGetChallengeDetailsResponse = IChallengeEntity;
