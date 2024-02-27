import { RouteObject, createBrowserRouter } from "react-router-dom";
import HomeRouter from "../views/home/router";
import AuthRouter from "../views/auth/router";
import MainLayout from "../layouts/main";
import TDPrintRouter from "../views/3dPrint/router";
import SystemRouter from "@/views/system/router";
import BlogRouter from "@/views/blog/router";
import UserRouter from "@/views/user/router";

export interface MyRouteObject {}

const createModuleRouter = (module: RouteObject) => {};

const router = createBrowserRouter([
  ...AuthRouter,
  {
    path: "/",
    element: <MainLayout />,
    children: [
      HomeRouter,
      TDPrintRouter,
      BlogRouter,
      SystemRouter,
      UserRouter,
      {
        path: "*",
        element: <div>404</div>,
      },
    ],
  },
]);

export default router;
