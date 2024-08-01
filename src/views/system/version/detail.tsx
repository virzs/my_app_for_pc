import BasePageContainer from "@/components/containter/base";
import { detailVersion } from "@/services/system/version";
import { ProCard } from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { Button, Space, Tag, Typography } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPlatformDicLabel, getUpdateTypeDicLabel } from "./dic";
import { RollbackOutlined } from "@ant-design/icons";
import { Editor } from "zs_library";

const { Title, Paragraph } = Typography;

const VersionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, run } = useRequest(detailVersion, {
    manual: true,
  });

  useEffect(() => {
    if (id) {
      run(id);
    }
  }, [id]);

  return (
    <BasePageContainer loading={loading}>
      <ProCard
        loading={loading}
        extra={
          <Space>
            <Button
              icon={<RollbackOutlined />}
              onClick={() => {
                navigate(-1);
              }}
            >
              返回
            </Button>
          </Space>
        }
      >
        <Title level={2}>{data?.version}</Title>
        <Paragraph>
          <Space>
            {data?.platforms?.map((platform: any) => (
              <Tag>
                {getPlatformDicLabel(platform?.platform)} (
                {getUpdateTypeDicLabel(platform?.updateType)})
              </Tag>
            ))}
          </Space>
        </Paragraph>
        {data?.content && (
          <Editor editable={false} value={JSON.parse(data?.content ?? "{}")} />
        )}
      </ProCard>
    </BasePageContainer>
  );
};

export default VersionDetail;
