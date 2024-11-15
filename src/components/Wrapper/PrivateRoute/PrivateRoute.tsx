import { FC, PropsWithChildren } from "react";
import useAuthStore from "../../../store/Auth/authStore";
import { useNavigate } from "react-router-dom";
import constantRoutesGlobal from "../../../constants/routes/global";

type PrivateRouteProps = PropsWithChildren & {};

const PrivateRouteWrapper: FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated: isAuthentication } = useAuthStore();
  const navigate = useNavigate();
  if (!isAuthentication) {
    navigate(constantRoutesGlobal.errorPage[404]);
    return;
  }
  return <>{children}</>;
};

export default PrivateRouteWrapper;
