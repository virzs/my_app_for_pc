import { invoke } from "@tauri-apps/api/tauri";
import { Button } from "antd";

const LoginView = () => {
  const login = () => {
    invoke("close_splashscreen");
  };

  return (
    <div className="w-screen h-screen">
      LoginView<Button onClick={login}>登录</Button>
    </div>
  );
};

export default LoginView;
