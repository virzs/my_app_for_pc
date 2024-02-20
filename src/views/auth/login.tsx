import { useNavigate } from "react-router-dom";
import { HomePaths } from "../home/router";
import { postLogin } from "../../services/auth";
import { setRefreshToken, setToken } from "../../utils/token";
import { setUserInfo } from "../../utils/userInfo";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import { LoginRequest } from "@/services/auth/interface";
import { useRequest } from "ahooks";
import { getPublicProject } from "@/services/system/project";
import { Space } from "antd";
import { AuthPaths } from "./router";

const LoginView = () => {
  const navigate = useNavigate();

  const { data } = useRequest(getPublicProject);

  return (
    <div className="w-screen h-screen flex justify-center items-center overflow-hidden">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <LoginForm<LoginRequest>
          title={data?.name}
          subTitle={data?.description}
          onFinish={(values) => {
            return new Promise((resolve) => {
              postLogin(values)
                .then((res) => {
                  const { access_token, refresh_token, ...rest } = res;
                  setUserInfo(rest);
                  setToken(access_token);
                  setRefreshToken(refresh_token);
                  navigate(HomePaths.home);
                  resolve(true);
                })
                .catch(() => {
                  resolve(false);
                });
            });
          }}
        >
          <ProFormText
            name="email"
            placeholder="邮箱"
            rules={[
              {
                required: true,
                message: "请输入邮箱",
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            placeholder="密码"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          />
          <Space className="justify-between mb-6 w-full">
            <a
              onClick={() => {
                navigate(AuthPaths.register);
              }}
            >
              注册账号
            </a>
            <a href="">忘记密码</a>
          </Space>
        </LoginForm>
      </div>
    </div>
  );
};

export default LoginView;
