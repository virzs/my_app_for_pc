import { RouteObject, createBrowserRouter } from "react-router-dom";
import HomeRouter from "../views/home/router";
import AuthRouter from "../views/auth/router";
import MainLayout from "../layouts/main";
import TDPrintRouter from "../views/3dPrint/router";

export interface MyRouteObject{}

const createModuleRouter = (module: RouteObject) => {};

const router = createBrowserRouter([
  AuthRouter,
  {
    path: "/",
    element: <MainLayout />,
    children: [HomeRouter, TDPrintRouter],
  },
]);

export default router;
