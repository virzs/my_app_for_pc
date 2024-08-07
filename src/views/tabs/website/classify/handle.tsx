import {
  addWebsiteClassify,
  getWebsiteClassifyDetail,
  updateWebsiteClassify,
  WebsiteClassify,
} from "@/services/tabs/website_classifty";
import { baseFormItemLayout } from "@/utils/utils";
import { BetaSchemaForm, ProFormInstance } from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { Button, message } from "antd";
import { FC, useEffect, useRef } from "react";

export interface HandleModalProps {
  onFinished?: (values: any) => void;
  open?: boolean;
  editId?: string;
  onClose?: () => void;
  onDetailLoading?: (loading: boolean) => void;
  parent?: string;
}

const ClassifyHandle: FC<HandleModalProps> = (props) => {
  const { onFinished, open, editId, onClose, parent, onDetailLoading } = props;

  const ref = useRef<ProFormInstance<WebsiteClassify>>();

  const { data, loading, run } = useRequest(getWebsiteClassifyDetail, {
    manual: true,
  });

  useEffect(() => {
    if (editId) {
      run(editId);
    }
  }, [editId]);

  useEffect(() => {
    if (data) {
      ref.current?.setFieldsValue({
        ...data,
      } as any);
    }
  }, [data]);

  useEffect(() => {
    onDetailLoading?.(loading);
  }, [loading]);

  return (
    <BetaSchemaForm
      {...baseFormItemLayout}
      open={open}
      formRef={ref}
      layoutType="ModalForm"
      trigger={<Button type="primary">新增分类</Button>}
      title={editId ? "编辑分类" : "新增分类"}
      onOpenChange={(open) => {
        if (!open) {
          onClose?.();
        }
        ref.current?.resetFields();
      }}
      onFinish={(values) => {
        return new Promise((resolve) => {
          (editId
            ? updateWebsiteClassify(editId, values)
            : addWebsiteClassify(parent ? { ...values, parent } : values)
          )
            .then(() => {
              message.success(editId ? "修改成功" : "新增成功");
              onFinished?.(values);
              resolve(true);
              ref.current?.resetFields();
            })
            .catch(() => {
              resolve(false);
            });
        });
      }}
      modalProps={{
        destroyOnClose: true,
      }}
      columns={[
        {
          title: "名称",
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
          title: "图标",
          dataIndex: "icon",
          valueType: "upload",
          fieldProps: {
            dir: "website_classify",
            accept: "image/*",
          },
        },
        {
          title: "是否启用",
          dataIndex: "enable",
          valueType: "switch",
          initialValue: true,
        },
      ]}
    ></BetaSchemaForm>
  );
};

export default ClassifyHandle;
