import { RouteObject } from "react-router-dom";
import LoginView from ".";

const LoginRouter: RouteObject = {
  path: "/login",
  element: <LoginView />,
};

export default LoginRouter;
