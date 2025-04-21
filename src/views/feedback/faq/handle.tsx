import FullPageContainer from "@/components/containter/full";
import { SchemaForm } from "@/components/pro-form";
import { addFaq, editFaq, getFaqDetail } from "@/services/feedback/faq";
import { ProFormInstance } from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { message } from "antd";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FeedbackFaqHandlePage = () => {
  const ref = useRef<ProFormInstance>(null);
  const params = useParams();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const {
    data: detailData,
    loading: detailLoading,
    run: detailRun,
  } = useRequest(getFaqDetail, {
    manual: true,
  });

  const { runAsync: addRun } = useRequest(addFaq, {
    manual: true,
    onSuccess: () => {
      messageApi.success("新增成功");
      navigate(-1);
    },
  });

  const { runAsync: editRun } = useRequest(editFaq, {
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
            title: "问题",
            dataIndex: "question",
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
            title: "答案",
            dataIndex: "answer",
            valueType: "editor",
            formItemProps: {
              rules: [
                {
                  required: true,
                  message: "答案不能为空",
                },
              ],
            },
            fieldProps: {
              uploadDir: "feedback",
            },
          },
        ]}
      />
      {contextHolder}
    </FullPageContainer>
  );
};

export default FeedbackFaqHandlePage;
