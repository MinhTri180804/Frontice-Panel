import { Navigate, RouteObject } from 'react-router-dom';
import constantRoutesGlobal from '../../constants/routes/global';
import { NotFoundPage } from '../../pages/ErrorPage/NotFound';
import constantRoutesAuth from '../../constants/routes/authentication';

const notfoundRoute: RouteObject = {
  path: constantRoutesGlobal.errorPage[404],
  element: <NotFoundPage />,
};

const notMatchRoute: RouteObject = {
  path: '*',
  element: (
    <Navigate
      to={`/${constantRoutesAuth.root}/${constantRoutesAuth.options}`}
      replace
    />
  ),
};

export { notMatchRoute, notfoundRoute };
