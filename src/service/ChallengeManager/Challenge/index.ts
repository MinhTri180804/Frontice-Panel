import axiosClient from "../../../axios/axiosClient";
import constantChallengeManagerApi from "../../../constants/api/challengeManager";
import {
  IGetAllChallengeParams,
  IRemoveChallengeParams,
} from "../../../types/request/challenge";
import { IChallengeService } from "../../../types/services/challengeService";

const challengeService: IChallengeService = {
  getAll: (params: IGetAllChallengeParams) => {
    const { page = 1, sort = "newest", perPage = 10 } = params;
    return axiosClient.get(
      `${constantChallengeManagerApi.challenge.getAll}?sort=${sort}&page=${page}&per_page=${perPage}`,
    );
  },

  remove: (params: IRemoveChallengeParams) => {
    const { challengeId } = params;
    return axiosClient.delete(
      `${constantChallengeManagerApi.challenge.remove}/${challengeId}`,
    );
  },
};

export default challengeService;
