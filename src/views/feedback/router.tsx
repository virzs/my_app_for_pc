import { Menu } from "@/utils/menu";
import { RiFeedbackLine } from "@remixicon/react";
import { RouteObject } from "react-router-dom";
import FeedbackAllPage from "./all";
import FeedbackFaqPage from "./faq";
import FeedbackFaqHandlePage from "./faq/handle";
import FeedbackTypePage from "./type";
import TabsPageContainer from "@/components/containter/tabs";
import FeedbackProcessWaitPage from "./process/wait";
import FeedbackProcessDonePage from "./process/done";
import FeedbackTypeHandlePage from "./type/handle";

export const FeedbackPaths = {
  index: "/feedback",
  faq: "/feedback/faq",
  faqHandle: "/feedback/faq/handle",
  all: "/feedback/all",
  type: "/feedback/type",
  typeHandle: "/feedback/type/handle",
  process: "/feedback/process",
  processWait: "/feedback/process/wait",
  processDone: "/feedback/process/done",
};

const FeedbackRouter: RouteObject = {
  path: FeedbackPaths.index,
  children: [
    {
      path: FeedbackPaths.faq,
      element: <FeedbackFaqPage />,
    },
    {
      path: FeedbackPaths.faqHandle,
      element: <FeedbackFaqHandlePage />,
    },
    {
      path: FeedbackPaths.faqHandle + "/:id",
      element: <FeedbackFaqHandlePage />,
    },
    {
      path: FeedbackPaths.type,
      element: <FeedbackTypePage />,
    },
    {
      path: FeedbackPaths.typeHandle,
      element: <FeedbackTypeHandlePage />,
    },
    {
      path: FeedbackPaths.typeHandle + "/:id",
      element: <FeedbackTypeHandlePage />,
    },
    {
      path: FeedbackPaths.all,
      element: <FeedbackAllPage />,
    },
    {
      path: FeedbackPaths.processWait,
      element: <TabsPageContainer parent={FeedbackPaths.processWait} />,
      children: [
        {
          index: true,
          element: <FeedbackProcessWaitPage />,
        },
      ],
    },
    {
      path: FeedbackPaths.processDone,
      element: <TabsPageContainer parent={FeedbackPaths.processWait} />,
      children: [
        {
          index: true,
          element: <FeedbackProcessDonePage />,
        },
      ],
    },
  ],
};

export const FeedbackMenu: Menu = {
  name: "反馈",
  path: FeedbackPaths.index,
  icon: <RiFeedbackLine size={16} />,
  children: [
    {
      name: "常见问题",
      path: FeedbackPaths.faq,
      hideChildrenInMenu: true,
      children: [
        {
          name: "新增",
          path: FeedbackPaths.faqHandle,
        },
        {
          name: "编辑",
          path: FeedbackPaths.faqHandle + "/:id",
        },
      ],
    },
    {
      name: "反馈类型",
      path: FeedbackPaths.type,
      hideChildrenInMenu: true,
      children: [
        {
          name: "新增",
          path: FeedbackPaths.typeHandle,
        },
        {
          name: "编辑",
          path: FeedbackPaths.typeHandle + "/:id",
        },
      ],
    },
    {
      name: "处理反馈",
      path: FeedbackPaths.processWait,
      hideChildrenInMenu: true,
      children: [
        {
          name: "待处理",
          path: FeedbackPaths.processWait,
        },
        {
          name: "已处理",
          path: FeedbackPaths.processDone,
        },
      ],
    },
    {
      name: "全部反馈",
      path: FeedbackPaths.all,
    },
  ],
};

export default FeedbackRouter;
