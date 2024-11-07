import { Navigate, RouteObject } from 'react-router-dom';
import { RoleType } from '../types/base/role';
import authRoutes from '../routes/AuthRoutes/authRoutes';
import { challengeManagementRoutes } from '../routes/ChallengeManager';
import { DashBoardLayout } from '../layout/Root';
import constantRoutesChallengeManager from '../constants/routes/challengeManager';

const configureRoutes = (role: RoleType | null): RouteObject[] => {
  if (!role) {
    return authRoutes;
  }

  const roleBasedRoutes: RouteObject[] = (() => {
    switch (role) {
      case 'challengeManager':
        return challengeManagementRoutes;

      case 'mentor':
        // TODO: Implement mentor routes
        return [];

      case 'tasker':
        // TODO: Implement tasker routes
        return [];

      default:
        return [];
    }
  })();

  return [
    {
      path: '/',
      element: <DashBoardLayout />,
      children: [
        {
          index: true,
          element: (
            <Navigate
              to={constantRoutesChallengeManager.pages.statistic.root}
              replace
            />
          ),
        },
        ...roleBasedRoutes,
      ],
    },
  ];
};

export default configureRoutes;
