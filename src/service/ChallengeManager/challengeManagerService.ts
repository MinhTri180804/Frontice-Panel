import challengeService from "./Challenge";
import solutionService from "./Solution";
import taskeeService from "./Taskee";

const challengeManagerService = {
  challenge: challengeService,
  solution: solutionService,
  taskee: taskeeService,
};

export default challengeManagerService;
