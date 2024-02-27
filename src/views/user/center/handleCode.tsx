import { postInvitationCode } from "@/services/user";
import { BetaSchemaForm } from "@ant-design/pro-components";
import { FC } from "react";

interface HandleCodeProps {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
}

const HandleCode: FC<HandleCodeProps> = (props) => {
  const { open, onCancel, onOk } = props;

  return (
    <BetaSchemaForm
      layoutType="ModalForm"
      open={open}
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
      }}
      columns={[
        {
          title: "最大使用次数",
          dataIndex: "maxUse",
          valueType: "digit",
          fieldProps: {
            max: 9999,
            min: 1,
            step: 1,
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
