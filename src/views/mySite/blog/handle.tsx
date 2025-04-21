import {
  addBlog,
  getBlogDetail,
  publishBlog,
  updateBlog,
} from "@/services/mySite/blog";
import { ProFormInstance } from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { message, Modal } from "antd";
import FullPageContainer from "@/components/containter/full";
import { resourceDownload } from "@/services/resource";
import { SchemaForm } from "@/components/pro-form";

const { useModal } = Modal;

const BlogHandle = () => {
  const ref = useRef<ProFormInstance>(null);
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
    if (params.id) {
      detailRun(params.id);
    }
  }, [params]);

  return (
    <FullPageContainer loading={detailLoading}>
      <SchemaForm
        loading={addLoading || editLoading}
        formRef={ref}
        dataSource={detailData}
        setFieldsValueBefore={(data) => {
          const { cover, ...rest } = data;
          if (cover?._id) {
            downloadCover(detailData.cover?._id);
          }
          return rest;
        }}
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
      {contextHolder}
    </FullPageContainer>
  );
};

export default BlogHandle;
