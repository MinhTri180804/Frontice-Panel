import followerService from "./Follower";
import taskSerivce from "./Task";

const taskerService = {
  task: taskSerivce,
  follower: followerService,
};

export default taskerService;
