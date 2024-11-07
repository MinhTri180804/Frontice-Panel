import { RouteObject } from 'react-router-dom';
import constantRoutesChallengeManager from '../../constants/routes/challengeManager';
import constantDynamicRoute from '../../constants/routes/dynamicRoute';
import { ChallengeManagerController } from '../../pages/ChallengeManager';
import { notfoundRoute } from '../CommonRoutes';

const CHALLENGE_ROUTES = {
  PARENT: `${constantRoutesChallengeManager.pages.challenges.root}`,
  DETAILS: `${constantRoutesChallengeManager.pages.challenges.details}/:${constantDynamicRoute.challenge}`,
  CREATE: `${constantRoutesChallengeManager.pages.challenges.create}`,
};

const SOLUTION_ROUTES = {
  PARENT: `${constantRoutesChallengeManager.pages.solutions.root}`,
  DETAILS: `${constantRoutesChallengeManager.pages.solutions.details}/:${constantDynamicRoute.solution}`,
};

const STATISTIC_ROUTES = {
  PARENT: `${constantRoutesChallengeManager.pages.statistic}`,
};

const TASK_ROUTES = {
  PARENT: `${constantRoutesChallengeManager.pages.tasks.root}`,
  DETAILS: `${constantRoutesChallengeManager.pages.tasks.details}/:${constantDynamicRoute.task}`,
};

const REPORT_ROUTES = {
  PARENT: `${constantRoutesChallengeManager.pages.reports.root}`,
  CHALLENGE: {
    PARENT: `${constantRoutesChallengeManager.pages.reports.challenge.root}`,
    DETAILS: `${constantRoutesChallengeManager.pages.reports.details}/:${constantDynamicRoute.reportChallenge}`,
  },
  SOLUTION: {
    PARENT: `${constantRoutesChallengeManager.pages.reports.solution.root}`,
    DETAILS: `${constantRoutesChallengeManager.pages.reports.details}/:${constantDynamicRoute.reportSolution}`,
  },
  TASK: {
    PARENT: `${constantRoutesChallengeManager.pages.reports.task.root}`,
    DETAILS: `${constantRoutesChallengeManager.pages.reports.details}/:${constantDynamicRoute.reportTask}`,
  },
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
];

const extendReportChallengeRoutes: RouteObject[] = [
  {
    index: true,
    element: <ChallengeManagerController.Report.Challenge.List />,
  },
  {
    path: REPORT_ROUTES.CHALLENGE.DETAILS,
    element: <ChallengeManagerController.Report.Challenge.Details />,
  },
];

const extendReportSolutionRoutes: RouteObject[] = [
  {
    index: true,
    element: <ChallengeManagerController.Report.Solution.List />,
  },
  {
    path: REPORT_ROUTES.SOLUTION.DETAILS,
    element: <ChallengeManagerController.Report.Solution.Details />,
  },
];

const extendReportTaskRoutes: RouteObject[] = [
  {
    index: true,
    element: <ChallengeManagerController.Report.Task.List />,
  },
  {
    path: REPORT_ROUTES.TASK.DETAILS,
    element: <ChallengeManagerController.Report.Task.Details />,
  },
];

const challengeManagementRoutes: RouteObject[] = [
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
    path: REPORT_ROUTES.PARENT,
    children: [
      {
        path: REPORT_ROUTES.CHALLENGE.PARENT,
        children: [...extendReportChallengeRoutes, notfoundRoute],
      },
      {
        path: REPORT_ROUTES.SOLUTION.PARENT,
        children: [...extendReportSolutionRoutes, notfoundRoute],
      },
      {
        path: REPORT_ROUTES.TASK.PARENT,
        children: [...extendReportTaskRoutes, notfoundRoute],
      },
    ],
  },

  {
    path: STATISTIC_ROUTES.PARENT,
    children: [...extendStatisticRoutes, notfoundRoute],
  },
];

export default challengeManagementRoutes;
