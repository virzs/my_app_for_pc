import { PageContainer, PageContainerProps } from "@ant-design/pro-components";
import { FC } from "react";
import { cx, css } from "@emotion/css";

export interface BasePageContainerProps extends PageContainerProps {}

const BasePageContainer: FC<BasePageContainerProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <PageContainer
      className={cx(
        className,
        css`
          .ant-page-header {
            padding-bottom: 8px;
            .ant-breadcrumb {
              height: 2.5rem;
              padding: 0;
              display: flex;
              align-items: center;
            }
          }
          /* 手机端padding调小 ant-page-header ant-pro-page-container-children-container */
          @media (max-width: 500px) {
            .ant-page-header {
              padding-left: 24px;
              padding-right: 24px;
              .ant-page-header-breadcrumb {
                padding-top: 12px;
              }
            }
            .ant-pro-page-container-children-container {
              padding: 0 24px 24px;
            }
          }
        `
      )}
      title={false}
      fixedHeader={false}
      ghost
      {...rest}
    />
  );
};

export default BasePageContainer;
