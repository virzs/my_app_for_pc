import BasePageContainer from "@/components/containter/base";
import { detailRole } from "@/services/system/role";
import { findChildren } from "@/utils/utils";
import { useRequest } from "ahooks";
import { Tree } from "antd";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "antd";
import { ProCard } from "@ant-design/pro-components";

const { Title, Paragraph } = Typography;

const RoleDetail = () => {
  const { id } = useParams();

  const {
    data = {},
    loading,
    run,
  } = useRequest(detailRole, {
    manual: true,
  });

  const { permissions = [] } = data;

  //   将 permissions 按 parent 转为树形结构，递归循环
  const treeData = useMemo(() => {
    return findChildren(permissions);
  }, [permissions]);

  useEffect(() => {
    if (id) {
      run(id);
    }
  }, [id]);

  return (
    <BasePageContainer loading={loading}>
      <ProCard loading={loading}>
        <Title level={2}>{data?.name}</Title>
        <Paragraph>{data?.description}</Paragraph>
        <Tree
          treeData={treeData}
          titleRender={(r) => {
            return r.name;
          }}
        />
      </ProCard>
    </BasePageContainer>
  );
};

export default RoleDetail;
