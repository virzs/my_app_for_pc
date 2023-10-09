import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { HomePaths } from "../home/router";

const { Item } = Form;

const LoginView = () => {
  const navigate = useNavigate();

  const login = () => {
    console.log("login click");
    navigate(HomePaths.home);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="p-8 w-full">
        <Form>
          <Item>
            <Input placeholder="邮箱" />
          </Item>
          <Item>
            <Input placeholder="密码" />
          </Item>
        </Form>
        <Button block type="primary" onClick={login}>
          登录
        </Button>
      </div>
    </div>
  );
};

export default LoginView;
