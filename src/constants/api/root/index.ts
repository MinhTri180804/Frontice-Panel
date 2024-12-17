import subscriptionApi from "./subscription";
import taskerApi from "./tasker";
import userApi from "./user";

const constantRootApi = {
  tasker: taskerApi,
  user: userApi,
  subscription: subscriptionApi,
};

export default constantRootApi;
