import { Navigate, RouteObject } from "react-router";
import constantRoutesRoot from "../../constants/routes/root";
import { RootController } from "../../pages/Root";
import { element } from "prop-types";
import { ChallengeManagerController } from "../../pages/ChallengeManager";
import { toast } from "react-toastify";

const USER_ROUTES = {
  ROOT: constantRoutesRoot.user.root,
  CHALLENGE_MANAGER: constantRoutesRoot.user.challengeManage,
  MENTOR: constantRoutesRoot.user.mentor,
  TASKER: constantRoutesRoot.user.tasker,
  TASKEE: constantRoutesRoot.user.taskee,
  ALL: constantRoutesRoot.user.all,
};

const CHALLENGE_ROUTES = {
  ROOT: constantRoutesRoot.challenge.root,
};

const TASKER_ROUTES = {
  ROOT: constantRoutesRoot.tasker.root,
  REQUEST_APPROVE: constantRoutesRoot.tasker.requestApprove,
};

const extendTaskerRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={TASKER_ROUTES.REQUEST_APPROVE} replace />,
  },
  {
    path: TASKER_ROUTES.REQUEST_APPROVE,
    element: <RootController.Tasker.RequestApprove />,
  },
];

const extendUserRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={USER_ROUTES.ALL} replace />,
  },
  {
    path: USER_ROUTES.CHALLENGE_MANAGER,
    element: <RootController.User.ChallengeManager />,
  },
  {
    path: USER_ROUTES.ALL,
    element: <RootController.User.All />,
  },
  {
    path: USER_ROUTES.MENTOR,
    element: <RootController.User.Mentor />,
  },
  {
    path: USER_ROUTES.TASKEE,
    element: <RootController.User.Taskee />,
  },
  {
    path: USER_ROUTES.TASKER,
    element: <RootController.User.Tasker />,
  },
];

const extendChallengeRoutes: RouteObject[] = [
  {
    index: true,
    element: <ChallengeManagerController.Challenge.List />,
  },
];

const RootRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={CHALLENGE_ROUTES.ROOT} replace />,
  },
  {
    path: USER_ROUTES.ROOT,
    children: extendUserRoutes,
  },

  {
    path: CHALLENGE_ROUTES.ROOT,
    children: extendChallengeRoutes,
  },

  {
    path: TASKER_ROUTES.ROOT,
    children: extendTaskerRoutes,
  },
];

export default RootRoutes;
