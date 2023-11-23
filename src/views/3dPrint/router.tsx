import { RouteObject } from "react-router-dom";
import Model from "./model";
import { Menu } from "../../utils/menu";
import Printer from "./printer";
import SolidIcon from "../../components/fontawesome/solidIcon";
import PrinterDetail from "./printer/detail";
import Supplier from "./supplier";
import Filament from "./filament";
import FilamentType from "./filamnetType";

export const TDPrintPaths = {
  index: "/3dPrint",
  supplier: "/3dPrint/supplier",
  printer: "/3dPrint/printer",
  printerDetail: "/3dPrint/printer/:id",
  filamentType: "/3dPrint/filamentType",
  filament: "/3dPrint/filament",
  model: "/3dPrint/model",
};

const TDPrintRouter: RouteObject = {
  path: "/3dPrint",
  children: [
    {
      path: TDPrintPaths.supplier,
      element: <Supplier />,
    },
    {
      path: TDPrintPaths.printer,
      element: <Printer />,
    },
    {
      path: TDPrintPaths.printerDetail,
      element: <PrinterDetail />,
    },
    {
      path: TDPrintPaths.filamentType,
      element: <FilamentType />,
    },
    {
      path: TDPrintPaths.filament,
      element: <Filament />,
    },
    {
      path: TDPrintPaths.model,
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
      name: "供应商",
      path: TDPrintPaths.supplier,
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
      name: "耗材类型",
      path: TDPrintPaths.filamentType,
    },
    {
      name: "耗材",
      path: TDPrintPaths.filament,
    },
    {
      name: "模型",
      path: TDPrintPaths.model,
    },
  ],
};

export default TDPrintRouter;