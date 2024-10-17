import { RouteObject } from "react-router-dom";
import UserCenter from "./center";
import { Menu } from "@/utils/menu";
import { UserOutlined } from "@ant-design/icons";
import User from "./all";
import StatisticsPage from "./statistics";

export const UserPaths = {
  index: "/user",
  all: "/user/all",
  statistics: "/user/statistics",
  center: "/user/center",
};

const UserRouter: RouteObject = {
  path: UserPaths.index,
  children: [
    {
      path: UserPaths.statistics,
      element: <StatisticsPage />,
    },
    {
      path: UserPaths.all,
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
  path: UserPaths.index,
  icon: <UserOutlined />,
  children: [
    {
      name: "统计",
      path: UserPaths.statistics,
    },
    {
      name: "全部用户",
      path: UserPaths.all,
    },
    {
      name: "个人中心",
      path: UserPaths.center,
      hideInMenu: true,
    },
  ],
};

export default UserRouter;
