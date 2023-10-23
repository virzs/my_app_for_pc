import { MenuDataItem, ProLayout } from "@ant-design/pro-components";
import { Outlet, useNavigate } from "react-router-dom";
import useMenu from "../hooks/useMenu";

const MainLayout = (props: any) => {
  const menus = useMenu();
  const navigate = useNavigate();

  const menuItemRender = (item: MenuDataItem, defaultDom: React.ReactNode) => {
    if (item.isUrl || !item.path || location.pathname === item.path) {
      return <div className={item.single ? "" : "pl-2"}>{defaultDom}</div>;
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
      logo={false}
      title="管理系统"
      route={{
        routes: menus,
      }}
      menuItemRender={menuItemRender}
      {...props}
    >
      <Outlet />
    </ProLayout>
  );
};

export default MainLayout;
