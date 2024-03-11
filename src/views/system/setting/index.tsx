import BasePageContainer from "@/components/containter/base";
import {
  ProjectData,
  addProject,
  getProject,
  updateProject,
} from "@/services/system/project";
import { baseFormItemLayout } from "@/utils/utils";
import {
  BetaSchemaForm,
  ProCard,
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
    <BasePageContainer>
      <ProCard>
        <div className="max-w-5xl mx-auto">
          <BetaSchemaForm
            {...baseFormItemLayout}
            loading={loading}
            formRef={ref}
            onFinish={(values) => {
              return new Promise((resolve) => {
                (data?._id
                  ? updateProject(data?._id, values)
                  : addProject(values)
                )
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
                title: "基础设置",
                renderFormItem: () => <></>,
                formItemProps: {
                  colon: false,
                },
              },
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
              {
                title: "登录页设置",
                renderFormItem: () => <></>,
                formItemProps: {
                  colon: false,
                },
              },
              {
                title: "标题",
                dataIndex: ["login", "title"],
                valueType: "text",
                fieldProps: {
                  style: {
                    width: "100%",
                  },
                },
              },
              {
                title: "副标题",
                dataIndex: ["login", "subTitle"],
                valueType: "text",
              },
              {
                title: "背景",
                dataIndex: ["login", "background"],
                valueType: "upload",
                fieldProps: {
                  maxCount: 1,
                  accept: "image/*",
                },
              },
              {
                title: "用户协议",
                dataIndex: ["login", "agreement"],
                valueType: "editor",
              },
              {
                title: "注册页设置",
                renderFormItem: () => <></>,
                formItemProps: {
                  colon: false,
                },
              },
              {
                title: "标题",
                dataIndex: ["register", "title"],
                valueType: "text",
              },
              {
                title: "副标题",
                dataIndex: ["register", "subTitle"],
                valueType: "text",
              },
              {
                title: "背景",
                dataIndex: ["register", "background"],
                valueType: "upload",
                fieldProps: {
                  maxCount: 1,
                  accept: "image/*",
                },
              },
              {
                title: "用户协议",
                dataIndex: ["login", "agreement"],
                valueType: "editor",
              },
            ]}
          />
        </div>
      </ProCard>
    </BasePageContainer>
  );
};

export default Setting;
