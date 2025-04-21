import FullPageContainer from "@/components/containter/full";
import { SchemaForm } from "@/components/pro-form";
import { addType, editType, getTypeDetail } from "@/services/feedback/type";
import { ProFormInstance } from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { message } from "antd";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FeedbackTypeHandlePage = () => {
  const ref = useRef<ProFormInstance>(null);
  const params = useParams();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const {
    data: detailData,
    loading: detailLoading,
    run: detailRun,
  } = useRequest(getTypeDetail, {
    manual: true,
  });

  const { runAsync: addRun } = useRequest(addType, {
    manual: true,
    onSuccess: () => {
      messageApi.success("新增成功");
      navigate(-1);
    },
  });

  const { runAsync: editRun } = useRequest(editType, {
    manual: true,
    onSuccess: () => {
      messageApi.success("修改成功");
      navigate(-1);
    },
  });

  const handleFinish = async (values: any) => {
    if (params.id) {
      return await editRun(params.id, values);
    }
    return await addRun(values);
  };

  useEffect(() => {
    if (params.id) {
      detailRun(params.id);
    }
  }, [params]);

  return (
    <FullPageContainer loading={detailLoading}>
      <SchemaForm
        dataSource={detailData}
        formRef={ref}
        onFinish={handleFinish}
        columns={[
          {
            title: "反馈类型",
            dataIndex: "type",
            formItemProps: {
              rules: [
                {
                  required: true,
                  message: "反馈类型不能为空",
                },
              ],
            },
          },
          {
            title: "描述",
            dataIndex: "description",
            valueType: "textarea",
          },
          {
            title: "是否启用",
            dataIndex: "enable",
            valueType: "switch",
            formItemProps: {
              initialValue: true,
            },
          },
          {
            title: "处理人",
            dataIndex: "handler",
            valueType: "userSelect",
          },
        ]}
      />
      {contextHolder}
    </FullPageContainer>
  );
};

export default FeedbackTypeHandlePage;
