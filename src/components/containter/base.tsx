import { PageContainer, PageContainerProps } from "@ant-design/pro-components";
import { FC } from "react";

export interface BasePageContainerProps extends PageContainerProps {}

const BasePageContainer: FC<BasePageContainerProps> = (props) => {
  const { ...rest } = props;

  return <PageContainer title={false} fixedHeader ghost {...rest} />;
};

export default BasePageContainer;
