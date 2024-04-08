import { RouteObject } from "react-router-dom";
import Role from "./role";
import Permission from "./permission";
import { Menu } from "@/utils/menu";
import SolidIcon from "@/components/fontawesome/solidIcon";
import Setting from "./setting";
import RoleHandle from "./role/handle";
import RoleDetail from "./role/detail";
import Version from "./version";
import VersionHandle from "./version/handle";
import VersionDetail from "./version/detail";

export const SystemPaths = {
  index: "/system",
  role: "/system/role",
  roleHandle: "/system/role/handle",
  permission: "/system/permission",
  setting: "/system/setting",
  version: "/system/version",
  versionHandle: "/system/version/handle",
};

const SystemRouter: RouteObject = {
  path: "/system",
  children: [
    {
      path: SystemPaths.role,
      element: <Role />,
    },
    {
      path: SystemPaths.roleHandle,
      element: <RoleHandle />,
    },
    {
      path: SystemPaths.roleHandle + "/:id",
      element: <RoleHandle />,
    },
    {
      path: SystemPaths.role + "/:id",
      element: <RoleDetail />,
    },
    {
      path: SystemPaths.setting,
      element: <Setting />,
    },
    {
      path: SystemPaths.permission,
      element: <Permission />,
    },
    {
      path: SystemPaths.setting,
      element: <Setting />,
    },
    {
      path: SystemPaths.version,
      element: <Version />,
    },
    {
      path: SystemPaths.versionHandle,
      element: <VersionHandle />,
    },
    {
      path: SystemPaths.versionHandle + "/:id",
      element: <VersionHandle />,
    },
    {
      path: SystemPaths.version + "/:id",
      element: <VersionDetail />,
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
      hideChildrenInMenu: true,
      children: [
        {
          name: "新增",
          path: SystemPaths.roleHandle,
        },
        {
          name: "编辑",
          path: SystemPaths.roleHandle + "/:id",
        },
        {
          name: "详情",
          path: SystemPaths.role + "/:id",
        },
      ],
    },
    {
      name: "权限",
      path: SystemPaths.permission,
      icon: <SolidIcon name="user-lock" />,
    },
    {
      name: "版本",
      path: SystemPaths.version,
      icon: <SolidIcon name="code-branch" />,
      hideChildrenInMenu: true,
      children: [
        {
          name: "新增",
          path: SystemPaths.versionHandle,
        },
        {
          name: "编辑",
          path: SystemPaths.versionHandle + "/:id",
        },
        {
          name: "详情",
          path: SystemPaths.version + "/:id",
        },
      ],
    },
    {
      name: "设置",
      path: SystemPaths.setting,
      icon: <SolidIcon name="cog" />,
    },
  ],
};

export default SystemRouter;
