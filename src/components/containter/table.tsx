import { Outlet } from "react-router-dom";
import { cx, css } from "@emotion/css";
import BasePageContainer, { BasePageContainerProps } from "./base";
import { FC } from "react";

export interface TablePageContainerProps extends BasePageContainerProps {}

const TablePageContainer: FC<TablePageContainerProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <BasePageContainer
      className={cx(
        "h-full overflow-hidden flex flex-col",
        css`
          .ant-pro-table,
          .ant-list {
            display: flex;
            flex-direction: column;
          }
          .ant-pro-grid-content,
          .ant-pro-grid-content-children,
          .ant-pro-table,
          .ant-pro-card,
          .ant-pro-card-body,
          .ant-table-wrapper,
          .ant-spin-nested-loading,
          .ant-spin-container,
          .ant-table,
          .ant-list {
            /* height 继承父级 */
            height: inherit;
          }
          .ant-pro-table-search {
            height: auto;
            flex-shrink: 0;
          }
          .ant-pro-card-body,
          .ant-spin-container {
            display: flex;
            flex-direction: column;
          }
        `
      )}
      childrenContentStyle={{
        height: "100%",
      }}
      fixedHeader={false}
      {...rest}
    >
      {children ?? <Outlet />}
    </BasePageContainer>
  );
};

export default TablePageContainer;
