import { createBrowserRouter } from "react-router-dom";
import HomeRouter from "../views/home/router";
import AuthRouter from "../views/auth/router";
import MainLayout from "../layouts/main";
import TDPrintRouter from "../views/3dPrint/router";
import SystemRouter from "@/views/system/router";
import UserRouter from "@/views/user/router";
import TabsRouter from "@/views/tabs/router";

export interface MyRouteObject {}

const router = createBrowserRouter([
  ...AuthRouter,
  {
    path: "/",
    element: <MainLayout />,
    children: [
      HomeRouter,
      TDPrintRouter,
      SystemRouter,
      UserRouter,
      TabsRouter,
      {
        path: "*",
        element: <div>404</div>,
      },
    ],
  },
]);

export default router;
