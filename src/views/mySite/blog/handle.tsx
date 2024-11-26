import {
  addBlog,
  getBlogDetail,
  publishBlog,
  updateBlog,
} from "@/services/mySite/blog";
import {
  BetaSchemaForm,
  ProCard,
  ProFormInstance,
} from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { baseFormItemLayout } from "../../../utils/utils";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { message, Modal } from "antd";
import FullPageContainer from "@/components/containter/full";
import { resourceDownload } from "@/services/resource";

const { useModal } = Modal;

const BlogHandle = () => {
  const ref = useRef<ProFormInstance>();
  const params = useParams();
  const navigate = useNavigate();
  const [modal, contextHolder] = useModal();

  const {
    data: detailData,
    loading: detailLoading,
    run: detailRun,
  } = useRequest(getBlogDetail, {
    manual: true,
  });

  const { run: publishRun } = useRequest(publishBlog, {
    manual: true,
    onSuccess: () => {
      message.success("操作成功");
      navigate(-1);
    },
  });

  const { loading: addLoading, run: addRun } = useRequest(addBlog, {
    manual: true,
    onSuccess: (data) => {
      message.success("添加成功");
      handlePublish(data);
    },
  });

  const { loading: editLoading, run: editRun } = useRequest(updateBlog, {
    manual: true,
    onSuccess: (data) => {
      message.success("修改成功");
      handlePublish(data);
    },
  });

  const { run: downloadCover } = useRequest(resourceDownload, {
    manual: true,
    onSuccess: (data) => {
      ref.current?.setFieldsValue({
        cover: {
          ...detailData?.cover,
          url: data,
        },
      });
    },
  });

  const handlePublish = async ({ _id }: { _id: string }) => {
    modal.confirm({
      title: "是否发布?",
      content: "发布后将会在网站展示",
      onOk: () => {
        if (_id) {
          publishRun(_id);
        } else {
          message.error("发布失败");
        }
      },
      onCancel: () => {
        navigate(-1);
      },
    });
  };

  const handleFinish = async (values: any) => {
    if (params.id) {
      editRun(params.id, values);
    } else {
      addRun(values);
    }
  };

  useEffect(() => {
    if (ref.current && detailData) {
      const { cover, ...rest } = detailData;
      if (cover?._id) {
        downloadCover(detailData.cover?._id);
      }
      ref.current.setFieldsValue(rest);
    }
  }, [detailData, ref]);

  useEffect(() => {
    if (params.id) {
      detailRun(params.id);
    }
  }, [params]);

  return (
    <FullPageContainer>
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
              fieldProps: {
                uploadDir: "blog",
              },
            },
          ]}
        />
      </ProCard>
      {contextHolder}
    </FullPageContainer>
  );
};

export default BlogHandle;
