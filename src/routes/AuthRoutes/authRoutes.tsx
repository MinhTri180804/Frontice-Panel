import { RouteObject, Navigate } from 'react-router-dom';
import constantRoutesAuth from '../../constants/routes/authentication';
import { AuthLayout } from '../../layout/Auth';
import LoginPage from '../../pages/Auth/Login';
import { OptionsRolePage } from '../../pages/Auth/Options';
import { RegisterPage } from '../../pages/Auth/Register';
import { notMatchRoute } from '../CommonRoutes';
import { GuestOnlyWrapper } from '../../components/Wrapper/GuestOnly';

const extendAuthRoutes: RouteObject[] = [
  {
    path: constantRoutesAuth.options,
    // index: true,
    element: <OptionsRolePage />,
  },
  {
    path: constantRoutesAuth.challengeManager.root,
    children: [
      {
        path: constantRoutesAuth.challengeManager.login,
        element: <LoginPage />,
      },
      notMatchRoute,
    ],
  },

  {
    path: constantRoutesAuth.mentor.root,
    children: [
      {
        path: constantRoutesAuth.mentor.login,
        element: <LoginPage />,
      },
      notMatchRoute,
    ],
  },

  {
    path: constantRoutesAuth.tasker.root,
    children: [
      {
        path: constantRoutesAuth.tasker.login,
        element: <LoginPage />,
      },
      {
        path: constantRoutesAuth.tasker.register,
        element: <RegisterPage />,
      },
      {
        path: constantRoutesAuth.tasker.forgotPassword,
        // TODO: Implement forgot password page for tasker
        element: <div>this is forgot password page</div>,
      },
      notMatchRoute,
    ],
  },
];

const authRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <GuestOnlyWrapper>
        <AuthLayout />
      </GuestOnlyWrapper>
    ),
    children: [
      {
        index: true,
        element: (
          <Navigate
            to={`${constantRoutesAuth.root}/${constantRoutesAuth.options}`}
            replace
          />
        ),
      },
      {
        path: constantRoutesAuth.root,
        children: [
          {
            index: true,
            element: <Navigate to={constantRoutesAuth.options} replace />,
          },
          ...extendAuthRoutes,
        ],
      },
      notMatchRoute,
    ],
  },
  notMatchRoute,
];

export default authRoutes;
