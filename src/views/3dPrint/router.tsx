import { RouteObject } from "react-router-dom";
import Model from "./model";
import { Menu } from "../../utils/menu";
import Printer from "./printer";
import PrinterDetail from "./printer/detail";
import Supplier from "./supplier";
import Filament from "./filament";
import FilamentType from "./filamnetType";
import SupplierHandle from "./supplier/handle";
import { RiPrinterLine } from "@remixicon/react";

export const TDPrintPaths = {
  index: "/3dPrint",
  supplier: "/3dPrint/supplier",
  supplierHandle: "/3dPrint/supplier/handle",
  printer: "/3dPrint/printer",
  printerDetail: "/3dPrint/printer/:id",
  filamentType: "/3dPrint/filamentType",
  filament: "/3dPrint/filament",
  model: "/3dPrint/model",
  order: "/3dPrint/order",
};

const TDPrintRouter: RouteObject = {
  path: "/3dPrint",
  children: [
    {
      path: TDPrintPaths.supplier,
      element: <Supplier />,
    },
    {
      path: TDPrintPaths.supplierHandle,
      element: <SupplierHandle />,
    },
    {
      path: TDPrintPaths.supplierHandle + "/:id",
      element: <SupplierHandle />,
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
  icon: <RiPrinterLine size={16} />,
  children: [
    {
      name: "仪表盘",
    },
    {
      name: "供应商",
      path: TDPrintPaths.supplier,
      hideChildrenInMenu: true,
      children: [
        {
          name: "新增",
          path: TDPrintPaths.supplierHandle,
        },
        {
          name: "修改",
          path: TDPrintPaths.supplierHandle + "/:id",
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
    {
      name: "订单",
      path: TDPrintPaths.order,
    },
  ],
};

export default TDPrintRouter;
