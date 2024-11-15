import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import useConfigureRoutes from "../config/configureRoutes";
import useAuthStore from "../store/Auth/authStore";

const AppRoutes: FC = () => {
  const role = useAuthStore((state) => state.role);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = createBrowserRouter(useConfigureRoutes(role, isAuthenticated));
  return <RouterProvider router={router} />;
};

export default AppRoutes;
