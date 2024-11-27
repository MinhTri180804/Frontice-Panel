import { Navigate, RouteObject } from "react-router-dom";
import constantRoutesGlobal from "../../constants/routes/global";
import { NotFoundPage } from "../../pages/ErrorPage/NotFound";
import constantRoutesAuth from "../../constants/routes/authentication";
import constantDynamicRoute from "../../constants/routes/dynamicRoute";
import { ProfileTaskee } from "../../pages/ProfileTaskee";
import { ProfileTasker } from "../../pages/ProfileTasker";

const notfoundRoute: RouteObject = {
  path: constantRoutesGlobal.errorPage[404],
  element: <NotFoundPage />,
};

const notMatchRoute: RouteObject = {
  path: "*",
  element: (
    <Navigate
      to={`/${constantRoutesAuth.root}/${constantRoutesAuth.options}`}
      replace
    />
  ),
};

const taskeeProfileRoute: RouteObject = {
  path: `${constantRoutesGlobal.profileTaskee}/:${constantDynamicRoute.taskeeId}`,
  element: <ProfileTaskee />,
};

const taskerProfileRoute: RouteObject = {
  path: `${constantRoutesGlobal.profileTasker}/:${constantDynamicRoute.taskerId}`,
  element: <ProfileTasker />,
};

export { notMatchRoute, notfoundRoute, taskeeProfileRoute, taskerProfileRoute };
