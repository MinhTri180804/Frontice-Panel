import { Navigate, RouteObject } from "react-router-dom";
import constantRoutesChallengeManager from "../../constants/routes/challengeManager";
import constantDynamicRoute from "../../constants/routes/dynamicRoute";
import { ChallengeManagerController } from "../../pages/ChallengeManager";
import { notfoundRoute } from "../CommonRoutes";
import {
  taskeeProfileRoute,
  taskerProfileRoute,
} from "../CommonRoutes/commonRoutes";

const CHALLENGE_ROUTES = {
  PARENT: `${constantRoutesChallengeManager.pages.challenges.root}`,
  DETAILS: `${constantRoutesChallengeManager.pages.challenges.details}/:${constantDynamicRoute.challenge}`,
  CREATE: `${constantRoutesChallengeManager.pages.challenges.create}`,
};

const SOLUTION_ROUTES = {
  PARENT: `${constantRoutesChallengeManager.pages.solutions.root}`,
  DETAILS: `${constantRoutesChallengeManager.pages.solutions.details}/:${constantDynamicRoute.solution}`,
  REPORT: `${constantRoutesChallengeManager.pages.solutions.report}`,
  REPORT_DETAILS: `:${constantDynamicRoute.reportSolution}`,
};

const STATISTIC_ROUTES = {
  PARENT: `${constantRoutesChallengeManager.pages.statistic.root}`,
};

const TASK_ROUTES = {
  PARENT: `${constantRoutesChallengeManager.pages.tasks.root}`,
  DETAILS: `${constantRoutesChallengeManager.pages.tasks.details}/:${constantDynamicRoute.task}`,
  REPORT: `${constantRoutesChallengeManager.pages.tasks.report}`,
  REPORT_DETAILS: `:${constantDynamicRoute.reportTask}`,
};

const extendChallengeRoutes: RouteObject[] = [
  {
    index: true,
    element: <ChallengeManagerController.Challenge.List />,
  },
  {
    path: CHALLENGE_ROUTES.DETAILS,
    element: <ChallengeManagerController.Challenge.Details />,
  },
  {
    path: CHALLENGE_ROUTES.CREATE,
    element: <ChallengeManagerController.Challenge.Upload />,
  },
];

const extendSolutionRoutes: RouteObject[] = [
  {
    index: true,
    element: <ChallengeManagerController.Solution.List />,
  },
  {
    path: SOLUTION_ROUTES.DETAILS,
    element: <ChallengeManagerController.Solution.Details />,
  },
  {
    path: SOLUTION_ROUTES.REPORT,
    children: [
      {
        index: true,
        element: <ChallengeManagerController.Solution.Reports />,
      },
      {
        path: SOLUTION_ROUTES.REPORT_DETAILS,
        element: <ChallengeManagerController.Solution.ReportDetails />,
      },
    ],
  },
];

const extendStatisticRoutes: RouteObject[] = [
  {
    index: true,
    element: <ChallengeManagerController.Statistic.Default />,
  },
];

const extendTaskRoutes: RouteObject[] = [
  {
    index: true,
    element: <ChallengeManagerController.Task.List />,
  },
  {
    path: TASK_ROUTES.DETAILS,
    element: <ChallengeManagerController.Task.Details />,
  },
  {
    path: TASK_ROUTES.REPORT,
    children: [
      {
        index: true,
        element: <ChallengeManagerController.Task.Reports />,
      },
      {
        path: TASK_ROUTES.REPORT_DETAILS,
        element: <ChallengeManagerController.Task.ReportDetails />,
      },
    ],
  },
];

const challengeManagementRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={CHALLENGE_ROUTES.PARENT} replace />,
  },
  {
    path: CHALLENGE_ROUTES.PARENT,
    children: [...extendChallengeRoutes, notfoundRoute],
  },

  {
    path: SOLUTION_ROUTES.PARENT,
    children: [...extendSolutionRoutes, notfoundRoute],
  },

  {
    path: TASK_ROUTES.PARENT,
    children: [...extendTaskRoutes, notfoundRoute],
  },

  {
    path: STATISTIC_ROUTES.PARENT,
    children: [...extendStatisticRoutes, notfoundRoute],
  },

  taskeeProfileRoute,
  taskerProfileRoute,
];

export default challengeManagementRoutes;
