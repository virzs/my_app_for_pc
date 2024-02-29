import { getRoleList } from "@/services/system/role";
import { postInvitationCode } from "@/services/user";
import { baseFormItemLayout } from "@/utils/utils";
import { BetaSchemaForm, ProFormInstance } from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { FC, useRef } from "react";

interface HandleCodeProps {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
  type?: number;
}

const HandleCode: FC<HandleCodeProps> = (props) => {
  const { open, onCancel, onOk, type } = props;

  const ref = useRef<ProFormInstance>();

  const { data, loading } = useRequest(getRoleList);

  return (
    <BetaSchemaForm
      width={450}
      {...baseFormItemLayout}
      layoutType="ModalForm"
      open={open}
      formRef={ref}
      title="创建邀请码"
      onFinish={(values) => {
        return new Promise((resolve, reject) => {
          postInvitationCode(values)
            .then(() => {
              onOk();
              resolve(null);
            })
            .catch(reject);
        });
      }}
      onOpenChange={(open) => {
        if (!open) {
          onCancel();
        }
        ref.current?.resetFields();
      }}
      columns={[
        ...(type === 0
          ? [
              {
                title: "默认角色",
                dataIndex: "roles",
                valueType: "select",
                valueEnum: data?.reduce((prev, curr) => {
                  prev[curr._id] = curr.name;
                  return prev;
                }, {} as { [x: string]: any }),
                fieldProps: {
                  mode: "multiple",
                  loading,
                },
              },
            ]
          : []),
        {
          title: "最大使用次数",
          dataIndex: "maxUse",
          valueType: "digit",
          fieldProps: {
            max: 9999,
            min: 1,
            precision: 0,
          },
        },
        {
          title: "有效期",
          dataIndex: "expire",
          valueType: "date",
        },
      ]}
    />
  );
};

export default HandleCode;
