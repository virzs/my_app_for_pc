import { SystemMenu } from "@/views/system/router";
import { Menu } from "../utils/menu";
import { TDPrintMenu } from "../views/3dPrint/router";
import { BlogMenu } from "@/views/blog/router";
import { UserMenu } from "@/views/user/router";

const Menus: Menu[] = [TDPrintMenu, BlogMenu, SystemMenu, UserMenu];

export default Menus;
