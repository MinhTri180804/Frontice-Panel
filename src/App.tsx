import { useRoutes } from "react-router-dom";
import "./App.css";
import configureRoutes from "./config/configureRoutes";
import useCheckAuthOnReload from "./hooks/useCheckAuthOnReload";
import { LoadingAuthentication } from "./components/Loading/Authentication";

function App() {
  const { role, isAuthentication, isPending } = useCheckAuthOnReload();
  const routing = useRoutes(configureRoutes(role, isAuthentication));

  if (isPending) return <LoadingAuthentication />;

  return <>{routing}</>;
}

export default App;
