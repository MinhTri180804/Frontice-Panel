import ChallengeManagement from "./Challenges/ChallengeManagement";
import SolutionManagement from "./Solutions/SolutionManagement";
import StatisticManagement from "./Statistic/StatisticManagement";
import TaskManagement from "./Task/TaskManagement";

const ChallengeManagerController = () => {
  return null;
};

ChallengeManagerController.Challenge = ChallengeManagement;
ChallengeManagerController.Solution = SolutionManagement;
ChallengeManagerController.Statistic = StatisticManagement;
ChallengeManagerController.Task = TaskManagement;

export default ChallengeManagerController;
