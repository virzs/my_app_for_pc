import { RouteObject } from "react-router-dom";
import LoginView from ".";

export const AuthPaths = {
  login: "/login",
};

const AuthRouter: RouteObject = {
  path: AuthPaths.login,
  element: <LoginView />,
};

export default AuthRouter;
