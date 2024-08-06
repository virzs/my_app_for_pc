import { RouteObject } from "react-router-dom";
import Website from "./website/index";
import { Menu } from "@/utils/menu";
import SolidIcon from "@/components/fontawesome/solidIcon";
import WebsiteClassify from "./website/classify";

export const TabsPaths = {
  index: "/tabs",
  website: "/tabs/website/website",
  websiteClassify: "/tabs/website/classify",
  websiteTag: "/tabs/website/tag",
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
  ],
};

export default TabsRouter;
