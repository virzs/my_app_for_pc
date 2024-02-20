import {
  ProjectData,
  addProject,
  getProject,
  updateProject,
} from "@/services/system/project";
import { baseFormItemLayout } from "@/utils/utils";
import {
  BetaSchemaForm,
  PageContainer,
  ProFormInstance,
} from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { message } from "antd";
import { useEffect, useRef } from "react";

const Setting = () => {
  const { data, loading, run } = useRequest(getProject);

  const ref = useRef<ProFormInstance<ProjectData>>();

  useEffect(() => {
    if (data) {
      ref.current?.setFieldsValue({
        ...data,
      } as any);
    }
  }, [data]);

  return (
    <PageContainer>
      <BetaSchemaForm
        {...baseFormItemLayout}
        loading={loading}
        formRef={ref}
        onFinish={(values) => {
          return new Promise((resolve) => {
            (data?._id ? updateProject(data?._id, values) : addProject(values))
              .then(() => {
                message.success("保存成功");
                resolve(true);
                run({});
              })
              .catch(() => {
                resolve(false);
              });
          });
        }}
        submitter={{
          searchConfig: {
            submitText: "保存",
          },
          render(props, dom) {
            return (
              <div className="flex items-center justify-center gap-2">
                {...dom}
              </div>
            );
          },
        }}
        columns={[
          {
            title: "系统名称",
            dataIndex: "name",
            valueType: "text",
            formItemProps: {
              rules: [
                {
                  required: true,
                  message: "请输入名称",
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
            title: "强制需要邀请码注册",
            dataIndex: "forceInvitationCode",
            valueType: "switch",
          },
        ]}
      />
    </PageContainer>
  );
};

export default Setting;
