import { RouteObject } from "react-router-dom";
import authRoutes from "../routes/AuthRoutes/authRoutes";
import { challengeManagementRoutes } from "../routes/ChallengeManager";
import { DashBoardLayout } from "../layout/Root";
import { RoleType } from "../types/base/role";

const useConfigureRoutes = (
  role: RoleType | null,
  isAuthenticated: boolean,
): RouteObject[] => {
  if (!role || !isAuthenticated) {
    console.log(2);
    return authRoutes;
  }
  console.log("authenticated");

const basedRoutes: () => RouteObject[] = () => {
    switch (role) {
      case "challenge":
        return challengeManagementRoutes;

      case "mentor":
        // TODO: Implement mentor routes
        return [];

      case "tasker":
        // TODO: Implement tasker routes
        return [];

      default:
        return [];
    }
  };

  return [
    {
      path: "/",
      element: <DashBoardLayout />,
      children: basedRoutes(),
    },
  ];
};

export default useConfigureRoutes;
