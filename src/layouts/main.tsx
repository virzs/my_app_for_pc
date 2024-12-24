import { MenuDataItem, ProLayout } from "@ant-design/pro-components";
import { Outlet, useNavigate } from "react-router-dom";
import useMenu from "../hooks/useMenu";
import { Dropdown } from "antd";
import { useRequest } from "ahooks";
import { postLogout } from "@/services/auth";
import { getUserInfo, removeUserInfo } from "@/utils/userInfo";
import {
  getRefreshToken,
  removeRefreshToken,
  removeToken,
} from "@/utils/token";
import { AuthPaths } from "@/views/auth/router";
import { UserPaths } from "@/views/user/router";
import { css, cx } from "@emotion/css";
import { motion } from "framer-motion";
import {
  RiColorFilterLine,
  RiDeviceLine,
  RiLogoutBoxLine,
  RiMoonLine,
  RiSunLine,
  RiTShirtLine,
  RiUserLine,
} from "@remixicon/react";
import { Theme } from "@/hooks/useTheme";
import { useLayout } from "@/context";

const MainLayout = (props: any) => {
  const menus = useMenu();
  const navigate = useNavigate();
  const userInfo = getUserInfo();

  const { setTheme } = useLayout();

  const { run: logoutRun } = useRequest(postLogout, {
    manual: true,
    onSuccess: () => {
      removeUserInfo();
      removeToken();
      removeRefreshToken();
      navigate(AuthPaths.login, {
        replace: true,
      });
    },
  });

  const menuItemRender = (item: MenuDataItem, defaultDom: React.ReactNode) => {
    if (item.isUrl || !item.path || location.pathname === item.path) {
      return <div className="pl-2">{defaultDom}</div>;
    }

    return (
      <div
        className={cx("w-full", item.single ? "" : "pl-2")}
        onClick={() => {
          item.path && navigate(item.path);
        }}
      >
        {defaultDom}
      </div>
    );
  };

  return (
    <ProLayout
      className={cx(
        "h-screen",
        css`
          .ant-pro-sider-actions-avatar {
            width: 100%;
            cursor: pointer;
          }
          .ant-layout-sider {
            .ant-layout-sider-children {
              border-radius: 0.75rem;
              border-right: 0;
            }
          }
        `
      )}
      logo={false}
      title="管理系统"
      route={{
        routes: menus,
      }}
      waterMarkProps={{
        content: `${userInfo?.username} ${userInfo?.email}`,
        className: "h-full",
      }}
      menuItemRender={menuItemRender}
      avatarProps={{
        src: userInfo?.avatar,
        title: userInfo?.username,
        size: "small",
        render(_, defaultDom) {
          return (
            <Dropdown
              trigger={["click"]}
              menu={{
                items: [
                  {
                    label: "个人中心",
                    key: "个人中心",
                    icon: <RiUserLine size={14} />,
                    onClick: () => {
                      navigate(UserPaths.center);
                    },
                  },
                  {
                    label: "个性化",
                    key: "个性化",
                    icon: <RiColorFilterLine size={14} />,
                    children: [
                      {
                        label: "主题",
                        key: "主题",
                        icon: <RiTShirtLine size={14} />,
                        children: [
                          {
                            label: "跟随系统",
                            key: "system",
                            icon: <RiDeviceLine size={14} />,
                            onClick: () => {
                              setTheme(Theme.Auto);
                            },
                          },
                          {
                            label: "浅色",
                            key: "light",
                            icon: <RiSunLine size={14} />,
                            onClick: () => {
                              setTheme(Theme.Light);
                            },
                          },
                          {
                            label: "深色",
                            key: "dark",
                            icon: <RiMoonLine size={14} />,
                            onClick: () => {
                              setTheme(Theme.Dark);
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: "退出登录",
                    key: "退出登录",
                    icon: <RiLogoutBoxLine size={14} />,
                    onClick: () => {
                      logoutRun({
                        refreshToken: getRefreshToken(),
                      });
                    },
                  },
                ],
              }}
            >
              {defaultDom ?? "User"}
            </Dropdown>
          );
        },
      }}
      {...props}
    >
      <motion.div
        className="h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Outlet />
      </motion.div>
    </ProLayout>
  );
};

export default MainLayout;
