import { RouteObject } from "react-router-dom";
import Website from "./website/index";
import { Menu } from "@/utils/menu";
import SolidIcon from "@/components/fontawesome/solidIcon";
import WebsiteClassify from "./website/classify";
import Desktop from "./desktop";
import DesktopHandle from "./desktop/handle";

export const TabsPaths = {
  index: "/tabs",
  website: "/tabs/website/website",
  websiteClassify: "/tabs/website/classify",
  websiteTag: "/tabs/website/tag",
  desktop: "/tabs/desktop",
  desktopHandle: "/tabs/desktop/handle",
};

const TabsRouter: RouteObject = {
  path: TabsPaths.index,
  children: [
    {
      path: TabsPaths.website,
      element: <Website />,
    },
    {
      path: TabsPaths.websiteClassify,
      element: <WebsiteClassify />,
    },
    {
      path: TabsPaths.desktop,
      element: <Desktop />,
    },
    {
      path: TabsPaths.desktopHandle,
      element: <DesktopHandle />,
    },
  ],
};

export const TabsMenu: Menu = {
  name: "新标签页",
  path: TabsPaths.index,
  icon: <SolidIcon name="layer-group" />,
  children: [
    {
      name: "网站",
      children: [
        {
          name: "分类",
          path: TabsPaths.websiteClassify,
        },
        {
          name: "网站",
          path: TabsPaths.website,
        },
      ],
    },
    {
      name: "小组件",
      children: [
        {
          name: "分类",
          path: "1",
        },
        {
          name: "小组件",
          path: "2",
        },
      ],
    },
    {
      name: "搜索引擎",
      path: "1",
    },
    {
      name: "壁纸",
      path: "2",
    },
    {
      name: "桌面",
      path: TabsPaths.desktop,
      hideChildrenInMenu: true,
      children: [
        {
          name: "配置",
          path: TabsPaths.desktopHandle,
        },
      ],
    },
  ],
};

export default TabsRouter;
