import { SystemMenu } from "@/views/system/router";
import { Menu } from "../utils/menu";
import { TDPrintMenu } from "../views/3dPrint/router";
import { BlogMenu } from "@/views/blog/router";

const Menus: Menu[] = [TDPrintMenu, BlogMenu, SystemMenu];

export default Menus;
