import { Outlet } from "react-router-dom";
import BasePageContainer, { BasePageContainerProps } from "./base";
import { FC } from "react";

export interface TabsPageContainerProps extends BasePageContainerProps {}

const TabsPageContainer: FC<TabsPageContainerProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <BasePageContainer {...rest}>{children ?? <Outlet />}</BasePageContainer>
  );
};

export default TabsPageContainer;
