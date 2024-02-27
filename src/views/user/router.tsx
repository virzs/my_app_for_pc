import { RouteObject } from "react-router-dom";
import UserCenter from "./center";
import { Menu } from "@/utils/menu";
import { UserOutlined } from "@ant-design/icons";
import User from ".";

export const UserPaths = {
  center: "/user/center",
};

const UserRouter: RouteObject = {
  path: "/user",
  children: [
    {
      path: "list",
      element: <User />,
    },
    {
      path: UserPaths.center,
      element: <UserCenter />,
    },
  ],
};

export const UserMenu: Menu = {
  name: "用户",
  path: "/user",
  icon: <UserOutlined />,
  children: [
    {
      name: "全部用户",
      path: "list",
    },
    {
      name: "个人中心",
      path: UserPaths.center,
      hideInMenu: true,
    },
  ],
};

export default UserRouter;
