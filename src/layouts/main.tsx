import { MenuDataItem, ProLayout } from "@ant-design/pro-components";
import { Outlet, useNavigate } from "react-router-dom";
import useMenu from "../hooks/useMenu";
import { CloseCircleOutlined, UserOutlined } from "@ant-design/icons";
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

const MainLayout = (props: any) => {
  const menus = useMenu();
  const navigate = useNavigate();
  const userInfo = getUserInfo();

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
      return <div>{defaultDom}</div>;
    }

    return (
      <div
        className={item.single ? "" : "pl-2"}
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
      className="h-screen"
      logo={false}
      title="管理系统"
      route={{
        routes: menus,
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
                    icon: <UserOutlined />,
                    onClick: () => {
                      navigate(UserPaths.center);
                    },
                  },
                  {
                    label: "退出登录",
                    key: "退出登录",
                    icon: <CloseCircleOutlined />,
                    onClick: () => {
                      logoutRun({
                        refreshToken: getRefreshToken(),
                      });
                    },
                  },
                ],
              }}
            >
              {defaultDom}
            </Dropdown>
          );
        },
      }}
      {...props}
    >
      <Outlet />
    </ProLayout>
  );
};

export default MainLayout;
