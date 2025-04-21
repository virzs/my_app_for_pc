import { SystemMenu } from "@/views/system/router";
import { Menu } from "../utils/menu";
import { TDPrintMenu } from "../views/3dPrint/router";
import { UserMenu } from "@/views/user/router";
import { TabsMenu } from "@/views/tabs/router";
import { MySiteMenu } from "@/views/mySite/router";
import { ResourceMenu } from "@/views/resource/router";
import { FeedbackMenu } from "@/views/feedback/router";

const Menus: Menu[] = [
  SystemMenu,
  ResourceMenu,
  TDPrintMenu,
  UserMenu,
  TabsMenu,
  MySiteMenu,
  FeedbackMenu,
];

export default Menus;
