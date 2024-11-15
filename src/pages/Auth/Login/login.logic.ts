import { useMutation } from "@tanstack/react-query";
import authService from "../../../service/authService";
import { ILoginRequest } from "../../../types/request/login";
import { toast } from "react-toastify";
import { saveAccessToken, saveRefreshToken } from "../../../utils/localstorage";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/Auth/authStore";

const useLoginLogic = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const mutationLogin = useMutation({
    mutationKey: [],
    mutationFn: (data: ILoginRequest) => {
      return toast.promise(
        authService
          .login(data)
          .then((response) => {
            saveAccessToken(response.data.access_token);
            saveRefreshToken(response.data.refresh_token);
            return response.data;
          })
          .then(async (responseTokens) => {
            try {
              const responseInfo = await authService.infoMe();
              saveRefreshToken(responseTokens.refresh_token);
              saveAccessToken(responseTokens.access_token);
              login(responseInfo.data);
            } catch (error) {
              console.log("error: ", error);
            }
          }),
        {
          success: "Đăng nhập thành công",
          pending: "Đang thực hiện đăng nhập",
          error: "Đăng nhập thất bại ",
        },
      );
    },
    onSuccess: () => {
      navigate("/");
    },
  });

  return { mutationLogin };
};

export default useLoginLogic;
