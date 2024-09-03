import BasePageContainer from "@/components/containter/base";
import { baseFormItemLayout } from "@/utils/utils";
import { BetaSchemaForm } from "@ant-design/pro-components";
import { css } from "@emotion/css";
import DesktopEditor from "./components/DesktopEditor";

const DesktopHandle = () => {
  return (
    <BasePageContainer>
      <div
        className={css`
          .ant-pro-steps-form-container {
            width: 100%;
            .ant-space {
              width: 100%;
              display: flex;
              justify-content: center;
            }
          }
        `}
      >
        <BetaSchemaForm
          layoutType="StepsForm"
          steps={[
            {
              title: "基本信息",
              ...baseFormItemLayout,
            },
            {
              title: "桌面配置",
              wrapperCol: { span: 24 },
            },
          ]}
          columns={[
            [
              {
                title: "名称",
                dataIndex: "name",
                valueType: "text",
                formItemProps: {
                  rules: [
                    {
                      //   required: true,
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
                title: "角色",
                dataIndex: "role",
                valueType: "select",
                formItemProps: {
                  rules: [
                    {
                      //   required: true,
                      message: "请选择角色",
                    },
                  ],
                },
              },
            ],
            [
              {
                renderFormItem: (_, config) => {
                  return <DesktopEditor />;
                },
              },
            ],
          ]}
        />
      </div>
    </BasePageContainer>
  );
};

export default DesktopHandle;
