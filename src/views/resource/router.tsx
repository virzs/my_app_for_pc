import { Menu } from "@/utils/menu";
import { RiFolderLine } from "@remixicon/react";
import { RouteObject } from "react-router-dom";
import R2Page from "./r2";
import R2DetailPage from "./qiniu/detail";
import RecyclePage from "./recycle/index";

export const ResourcePaths = {
  index: "/resource",
  r2: "/resource/r2",
  r2Detail: "/resource/r2/:id",
  recycle: "/resource/recycle",
};

const ResourceRouter: RouteObject = {
  path: ResourcePaths.index,
  children: [
    {
      path: ResourcePaths.r2,
      element: <R2Page />,
    },
    {
      path: ResourcePaths.r2Detail,
      element: <R2DetailPage />,
    },
    {
      path: ResourcePaths.recycle,
      element: <RecyclePage />,
    },
  ],
};

export const ResourceMenu: Menu = {
  name: "资源",
  path: ResourcePaths.index,
  icon: <RiFolderLine size={16} />,
  children: [
    {
      name: "Cloudflare R2",
      path: ResourcePaths.r2,
    },
    {
      name: "回收站",
      path: ResourcePaths.recycle,
    },
  ],
};

export default ResourceRouter;
