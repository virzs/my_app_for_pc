import { Menu } from "@/utils/menu";
import { RiFolderLine } from "@remixicon/react";
import { RouteObject } from "react-router-dom";
import R2Page from "./r2";
import QiniuPage from "./qiniu";
import R2DetailPage from "./qiniu/detail";

export const ResourcePaths = {
  index: "/resource",
  r2: "/resource/r2",
  r2Detail: "/resource/r2/:id",
  qiniu: "/resource/qiniu",
  server: "/resource/server",
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
      path: ResourcePaths.qiniu,
      element: <QiniuPage />,
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
      name: "七牛云COS",
      path: ResourcePaths.qiniu,
    },
    {
      name: "服务器",
      path: ResourcePaths.server,
    },
  ],
};

export default ResourceRouter;
