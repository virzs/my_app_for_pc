import { RouteObject } from "react-router-dom";
import Model from "./model";
import { Menu } from "../../utils/menu";
import Printer from "./printer";
import SolidIcon from "../../components/fontawesome/solidIcon";
import PrinterDetail from "./printer/detail";
import Consumable from "./consumable/index";

export const TDPrintPaths = {
  index: "/3dPrint",
  printer: "/3dPrint/printer",
  printerDetail: "/3dPrint/printer/:id",
  consumable: "/3dPrint/consumable",
  model: "/3dPrint/model",
};

const TDPrintRouter: RouteObject = {
  path: "/3dPrint",
  children: [
    {
      path: "/3dPrint/printer",
      element: <Printer />,
    },
    {
      path: "/3dPrint/printer/:id",
      element: <PrinterDetail />,
    },
    {
      path: "/3dPrint/consumable",
      element: <Consumable />,
    },
    {
      path: "/3dPrint/model",
      element: <Model />,
    },
  ],
};

export const TDPrintMenu: Menu = {
  name: "3D 打印",
  path: TDPrintPaths.index,
  icon: <SolidIcon name="layer-group" />,
  children: [
    {
      name: "仪表盘",
    },
    {
      name: "配置",
      hideChildrenInMenu: true,
      children: [
        {
          name: "品牌",
        },
        {
          name: "我的账号",
        },
        {
          name: "我的订单",
        },
      ],
    },
    {
      name: "打印机",
      path: TDPrintPaths.printer,
      hideChildrenInMenu: true,
      children: [
        {
          name: "打印机详情",
          path: TDPrintPaths.printerDetail,
        },
      ],
    },
    {
      name: "耗材",
      path: TDPrintPaths.consumable,
      hideChildrenInMenu: true,
      children: [],
    },
    {
      name: "模型",
      path: TDPrintPaths.model,
    },
  ],
};

export default TDPrintRouter;
