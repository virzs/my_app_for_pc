import { SystemMenu } from "@/views/system/router";
import { Menu } from "../utils/menu";
import { TDPrintMenu } from "../views/3dPrint/router";
import { UserMenu } from "@/views/user/router";

const Menus: Menu[] = [TDPrintMenu, SystemMenu, UserMenu];

export default Menus;
