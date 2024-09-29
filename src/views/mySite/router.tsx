import { RouteObject } from "react-router-dom";
import Blog from "./blog";
import { Menu } from "@/utils/menu";
import { RiHome4Line } from "@remixicon/react";
import TabsPageContainer from "@/components/containter/tabs";
import BlogHandle from "./blog/handle";
import BlogDetail from "./blog/detail";

export const MySitePaths = {
  index: "/my-site",
  blog: "/my-site/blog",
  blogHandle: "/my-site/blog/handle",
  blogDetail: "/my-site/blog/detail",
};

const MySiteRouter: RouteObject = {
  path: MySitePaths.index,
  children: [
    {
      path: MySitePaths.blog,
      element: <TabsPageContainer parent={MySitePaths.blog} />,
      children: [
        {
          index: true,
          element: <Blog />,
        },
      ],
    },
    {
      path: "/my-site/tag",
      element: <TabsPageContainer parent={MySitePaths.blog} />,
      children: [
        {
          index: true,
          element: <Blog />,
        },
      ],
    },
    {
      path: MySitePaths.blogHandle,
      element: <BlogHandle />,
    },
    {
      path: MySitePaths.blogHandle + "/:id",
      element: <BlogHandle />,
    },
    {
      path: MySitePaths.blogDetail + "/:id",
      element: <BlogDetail />,
    },
  ],
};

export const MySiteMenu: Menu = {
  name: "我的站点",
  path: MySitePaths.index,
  icon: <RiHome4Line size={16} />,
  children: [
    {
      name: "博客",
      path: MySitePaths.blog,
      hideChildrenInMenu: true,
      children: [
        {
          name: "博客",
          path: MySitePaths.blog,
          children: [
            {
              name: "新增",
              path: MySitePaths.blogHandle,
            },
            {
              name: "编辑",
              path: MySitePaths.blogHandle + "/:id",
            },
            {
              name: "详情",
              path: MySitePaths.blogDetail + "/:id",
            },
          ],
        },
        {
          name: "标签",
          path: "/my-site/tag",
        },
      ],
    },
  ],
};

export default MySiteRouter;
