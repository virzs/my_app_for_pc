import { resourceBatchUpload } from "@/services/resource";
import { baseFormItemLayout } from "@/utils/utils";
import { BetaSchemaForm, ProFormInstance } from "@ant-design/pro-components";
import { message, ModalProps } from "antd";
import { FC, useRef } from "react";

export interface BaseUploadFormType {
  dir: string;
  files: File[];
}

export interface BaseUploadModalProps
  extends Omit<ModalProps, "onOk" | "onCancel" | "onClose"> {
  title?: string;
  onOk?: () => void;
  onClose?: () => void;
}

const BaseUploadModal: FC<BaseUploadModalProps> = (props) => {
  const { title, onClose, onOk, ...rest } = props;

  const ref = useRef<ProFormInstance>();

  return (
    <BetaSchemaForm<BaseUploadFormType>
      {...baseFormItemLayout}
      layoutType="ModalForm"
      title={title || "上传文件"}
      formRef={ref}
      onOpenChange={(open) => {
        if (!open) {
          onClose?.();
        }
        ref.current?.resetFields();
      }}
      onFinish={(values) => {
        return new Promise((resolve) => {
          resourceBatchUpload(values.dir, values.files)
            .then(() => {
              message.success("上传成功");
              onOk?.();
              resolve(true);
            })
            .catch(() => {
              resolve(false);
            });
        });
      }}
      columns={[
        {
          title: "路径",
          dataIndex: "dir",
          valueType: "text",
          formItemProps: {
            rules: [
              {
                required: true,
                message: "路径不能为空",
              },
            ],
          },
        },
        {
          title: "文件",
          dataIndex: "files",
          // @ts-ignore
          valueType: "upload",
          formItemProps: {
            rules: [
              {
                required: true,
                message: "文件不能为空",
              },
            ],
          },
          fieldProps: {
            dragger: true,
            multiple: true,
            manually: true,
          },
        },
      ]}
      {...rest}
    />
  );
};

export default BaseUploadModal;
