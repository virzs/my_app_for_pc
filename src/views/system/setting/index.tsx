import BasePageContainer from "@/components/containter/base";
import {
  ProjectData,
  addProject,
  getProject,
  updateProject,
} from "@/services/system/project";
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
        <div className="max-w-2xl mx-auto">
          <BetaSchemaForm
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
                title: "登录页面设置",
                valueType: "group",
                columns: [
                  {
                    title: "标题",
                    dataIndex: ["login", "title"],
                    valueType: "text",
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
                ],
              },
              {
                title: "注册页面设置",
                valueType: "group",
                columns: [
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
                ],
              },
            ]}
          />
        </div>
      </ProCard>
    </BasePageContainer>
  );
};

export default Setting;
