import BasePageContainer from "@/components/containter/base";
import { addBlog, getBlogDetail, updateBlog } from "@/services/mySite/blog";
import {
  BetaSchemaForm,
  ProCard,
  ProFormInstance,
} from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { baseFormItemLayout } from "../../../utils/utils";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { message } from "antd";

const BlogHandle = () => {
  const ref = useRef<ProFormInstance>();
  const params = useParams();
  const navigate = useNavigate();

  const {
    data: detailData,
    loading: detailLoading,
    run: detailRun,
  } = useRequest(getBlogDetail, {
    manual: true,
  });

  const { loading: addLoading, run: addRun } = useRequest(addBlog, {
    manual: true,
    onSuccess: () => {
      message.success("添加成功");
      navigate(-1);
    },
  });

  const { loading: editLoading, run: editRun } = useRequest(updateBlog, {
    manual: true,
    onSuccess: () => {
      message.success("修改成功");
      navigate(-1);
    },
  });

  const handleFinish = async (values: any) => {
    if (params.id) {
      editRun(params.id, values);
    } else {
      addRun(values);
    }
  };

  useEffect(() => {
    if (ref.current && detailData) {
      ref.current.setFieldsValue(detailData);
    }
  }, [detailData, ref]);

  useEffect(() => {
    if (params.id) {
      detailRun(params.id);
    }
  }, [params]);

  return (
    <BasePageContainer>
      <ProCard loading={detailLoading}>
        <BetaSchemaForm
          {...baseFormItemLayout}
          loading={addLoading || editLoading}
          layoutType="Form"
          formRef={ref}
          onFinish={handleFinish}
          columns={[
            {
              title: "标题",
              dataIndex: "title",
              valueType: "text",
              formItemProps: {
                rules: [
                  {
                    required: true,
                    message: "标题不能为空",
                  },
                ],
              },
            },
            {
              title: "封面图",
              dataIndex: "cover",
              valueType: "upload",
              fieldProps: {
                maxCount: 1,
                listType: "picture-card",
                dir: "blog",
                accept: "image/*",
              },
            },
            {
              title: "内容",
              dataIndex: "content",
              valueType: "editor",
              formItemProps: {
                rules: [
                  {
                    required: true,
                    message: "内容不能为空",
                  },
                ],
              },
            },
          ]}
        />
      </ProCard>
    </BasePageContainer>
  );
};

export default BlogHandle;
