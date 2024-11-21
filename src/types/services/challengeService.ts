import {
  ICreateChallengeRequest,
  IDeleteFileChallengeRequest,
  IGetAllChallengeParams,
  IRemoveChallengeParams,
  IUploadFigmaChallengeRequest,
  IUploadImageChallengeRequest,
  IUploadSourceChallengeRequest,
} from "../request/challenge";
import { IBaseResponse } from "../base/response";
import {
  IGetAllChallengeResponse,
  IUploadFigmaChallengeResponse,
  IUploadImageChallengeResponse,
  IUploadSourceChallengeResponse,
} from "../response/challenge";

export type IChallengeService = {
  getAll: (
    params: IGetAllChallengeParams,
  ) => Promise<IBaseResponse<IGetAllChallengeResponse>>;
  // getDetails: (params: IGetDetailsChallengeParams) => Promise<IBaseResponse<>>;

  uploadSource: (
    dataBody: IUploadSourceChallengeRequest,
  ) => Promise<IBaseResponse<IUploadSourceChallengeResponse>>;

  uploadImage: (
    dataBody: IUploadImageChallengeRequest,
  ) => Promise<IBaseResponse<IUploadImageChallengeResponse>>;

  uploadFigma: (
    dataBody: IUploadFigmaChallengeRequest,
  ) => Promise<IBaseResponse<IUploadFigmaChallengeResponse>>;

  remove: (params: IRemoveChallengeParams) => Promise<IBaseResponse<null>>;

  deleteFile: (
    data: IDeleteFileChallengeRequest,
  ) => Promise<IBaseResponse<null>>;

  create: (data: ICreateChallengeRequest) => Promise<IBaseResponse<null>>;
};
