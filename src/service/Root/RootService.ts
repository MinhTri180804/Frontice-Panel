import rootTaskerService from "./Tasker";
import userSerivce from "./User";

const rootService = {
  tasker: rootTaskerService,
  user: userSerivce,
};

export default rootService;
