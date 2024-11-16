import challengeService from "./Challenge";
import solutionService from "./Solution";

const challengeManagerService = {
  challenge: challengeService,
  solution: solutionService,
};

export default challengeManagerService;
