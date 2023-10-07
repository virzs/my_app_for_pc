import { invoke } from "@tauri-apps/api/tauri";
import { Button, Form, Input } from "antd";

const { Item } = Form;

const LoginView = () => {
  const login = () => {
    invoke("close_splashscreen");
  };

  return (
    <div className="w-screen h-screen">
      <div className="p-8">
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
