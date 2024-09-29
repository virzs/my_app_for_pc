import BasePageContainer from "@/components/containter/base";
import { getBlogDetail } from "@/services/mySite/blog";
import { ProCard } from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdEditor } from "zs_library";
import { Image } from "antd";

const BlogDetail = () => {
  const params = useParams();

  const { data, loading, run } = useRequest(getBlogDetail, {
    manual: true,
  });

  useEffect(() => {
    if (params.id) {
      run(params.id);
    }
  }, []);

  return (
    <BasePageContainer>
      <ProCard
        className="max-w-3xl mx-auto"
        title={
          <div className="relative">
            <Image
              preview={false}
              loading="lazy"
              src={data?.cover?.url}
              alt={data?.title}
            />
            <h1 className="absolute left-0 bottom-0 px-6 bg-gray-100">{data?.title}</h1>
          </div>
        }
        loading={loading}
      >
        <MdEditor.Preview>{data?.content}</MdEditor.Preview>
      </ProCard>
    </BasePageContainer>
  );
};

export default BlogDetail;
