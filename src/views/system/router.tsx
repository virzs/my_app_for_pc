import { RouteObject } from "react-router-dom";
import Role from "./role";
import Permission from "./permission";
import { Menu } from "@/utils/menu";
import SolidIcon from "@/components/fontawesome/solidIcon";

export const SystemPaths = {
  index: "/system",
  role: "/system/role",
  permission: "/system/permission",
};

const SystemRouter: RouteObject = {
  path: "/system",
  children: [
    {
      path: SystemPaths.role,
      element: <Role />,
    },
    {
      path: SystemPaths.permission,
      element: <Permission />,
    },
  ],
};

export const SystemMenu: Menu = {
  name: "系统",
  path: SystemPaths.index,
  icon: <SolidIcon name="gear" />,
  children: [
    {
      name: "角色",
      path: SystemPaths.role,
      icon: <SolidIcon name="user-tag" />,
    },
    {
      name: "权限",
      path: SystemPaths.permission,
      icon: <SolidIcon name="user-lock" />,
    },
  ],
};

export default SystemRouter;
