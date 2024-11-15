import { Flex, Form, Button, Input, Typography } from "antd";
import { FC, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import { BrandColorLogo } from "../../../assets/images/logos/locals";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { ILoginRequest } from "../../../types/request/login";
import useLoginLogic from "./login.logic.ts";

type IRoleInPath = "challenge-manager" | "mentor" | "tasker";

const LogoWrapper = styled.div`
  width: 220px;
  heigh: auto;

  & > img {
    width: 100%;
    heigh: 100%;
    object-fit: cover;
  }
`;

const LoginFormWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: "center";
  align-items: center;
`;

const LoginPage: FC = () => {
  const location = useLocation();
  const roleInPath = location.pathname.split("/")[2] as IRoleInPath;
  const [roleValue, setRoleValue] = useState<string>("");

  const { mutationLogin } = useLoginLogic();
  useEffect(() => {
    switch (roleInPath) {
      case "tasker":
        setRoleValue("Người tuyển dụng");
        break;

      case "mentor":
        setRoleValue("Người hỗ trợ");
        break;

      case "challenge-manager":
        setRoleValue("Người quản lí thử thách");
        break;

      default:
        break;
    }
  }, [roleInPath, location]);

  const onFinish = (formLoginData: ILoginRequest) => {
    mutationLogin.mutate(formLoginData);
  };

  return (
    <LoginFormWrapper>
      <Flex
        flex={1}
        vertical
        gap={32}
        justify="center"
        align="center"
        style={{ width: "fit-content" }}
      >
        <Flex vertical justify="center" align="center">
          <LogoWrapper>
            <img src={BrandColorLogo} />
          </LogoWrapper>
          <Typography style={{ fontSize: "16px" }}>
            Đăng nhập với vai trò{" "}
            <span style={{ color: "#5250F7", fontWeight: "bold" }}>
              {roleValue}
            </span>
          </Typography>
        </Flex>

        <Form
          name="login"
          initialValues={{ remember: true }}
          style={{ maxWidth: "360px", width: "300px" }}
          onFinish={onFinish}
        >
          <Form.Item<ILoginRequest>
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Email is not valid!",
              },
            ]}
          >
            <Input size="large" prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item<ILoginRequest>
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              size="large"
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              loading={mutationLogin.isPending}
              size="large"
              block
              type="primary"
              htmlType="submit"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </LoginFormWrapper>
  );
};

export default LoginPage;
