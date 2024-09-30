import { Outlet } from "react-router-dom";
import { cx, css } from "@emotion/css";
import BasePageContainer, { BasePageContainerProps } from "./base";
import { FC } from "react";

export interface FullPageContainerProps extends BasePageContainerProps {}

const FullPageContainer: FC<FullPageContainerProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <div
      className={cx(
        "h-full",
        css`
          .ant-pro-page-container {
            height: 100%;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            max-height: 100vh;
            .ant-pro-page-container-children-container {
              overflow-y: auto;
              > .ant-pro-card {
                height: 100%;
                .ant-pro-card-body {
                  overflow-y: auto;
                }
              }
            }
          }
          .ant-pro-grid-content {
            flex: 1;
            height: 0;
            .ant-pro-grid-content-children {
              height: 100%;
              .ant-pro-page-container-children-content {
                height: 100%;
              }
            }
          }
        `
      )}
    >
      <BasePageContainer
        childrenContentStyle={{
          height: "100%",
        }}
        fixedHeader={false}
        {...rest}
      >
        {children ?? <Outlet />}
      </BasePageContainer>
    </div>
  );
};

export default FullPageContainer;
