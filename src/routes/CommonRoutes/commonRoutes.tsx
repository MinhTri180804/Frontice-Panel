import { RouteObject } from 'react-router-dom';
import constantRoutesGlobal from '../../constants/routes/global';
import { NotFoundPage } from '../../pages/ErrorPage/NotFound';

const notfoundRoute: RouteObject = {
  path: constantRoutesGlobal.errorPage[404],
  element: <NotFoundPage />,
};

const notMatchRoute: RouteObject = {
  path: '*',
  element: <NotFoundPage />,
};

export { notMatchRoute, notfoundRoute };
