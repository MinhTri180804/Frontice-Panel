import { constantChallengeApi } from "./challenge";
import constantSolutionApi from "./solution";

const constantChallengeManagerApi = {
  challenge: constantChallengeApi,
  solution: constantSolutionApi,
};

export default constantChallengeManagerApi;
