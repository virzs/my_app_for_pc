import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { HomePaths } from "../home/router";
import { useRequest } from "ahooks";
import { postLogin } from "../../services/auth";
import { setRefreshToken, setToken } from "../../utils/token";
import { setUserInfo } from "../../utils/userInfo";

const { Item, useForm } = Form;

const LoginView = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const { validateFields } = form;

  const { loading, run } = useRequest(postLogin, {
    manual: true,
    onSuccess: (res) => {
      const { access_token, refresh_token, ...rest } = res;
      setUserInfo(rest);
      setToken(access_token);
      setRefreshToken(refresh_token);
      navigate(HomePaths.home);
    },
  });

  const login = () => {
    validateFields().then((values) => {
      run(values);
    });
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="p-8 w-full">
        <Form form={form}>
          <Item
            name="email"
            rules={[
              {
                required: true,
                message: "请输入邮箱",
              },
            ]}
          >
            <Input placeholder="邮箱" />
          </Item>
          <Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Input.Password placeholder="密码" />
          </Item>
        </Form>
        <Button block type="primary" onClick={login} loading={loading}>
          登录
        </Button>
      </div>
    </div>
  );
};

export default LoginView;
