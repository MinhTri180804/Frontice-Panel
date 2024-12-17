import subscriptionService from "./Subscription";
import rootTaskerService from "./Tasker";
import userSerivce from "./User";

const rootService = {
  tasker: rootTaskerService,
  user: userSerivce,
  subscription: subscriptionService,
};

export default rootService;
