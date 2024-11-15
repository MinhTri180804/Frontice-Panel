import {
  createBrowserRouter,
  RouterProvider,
  useRoutes,
} from "react-router-dom";
import "./App.css";
import configureRoutes from "./config/configureRoutes";
import useAuthStore from "./store/Auth/authStore";

function App() {
  const role = useAuthStore((state) => state.role);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const routing = useRoutes(configureRoutes(role, isAuthenticated));
  return <>{routing}</>;
}

export default App;
