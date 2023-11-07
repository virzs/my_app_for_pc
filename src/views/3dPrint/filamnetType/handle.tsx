import {
  getFilamentTypeDetail,
  postFilamentType,
  putFilamentType,
} from "@/services/3dPrint/filamentType";
import { baseFormItemLayout } from "@/utils/utils";
import { BetaSchemaForm, ProFormInstance } from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { Button, message } from "antd";
import { FC, useEffect, useRef } from "react";

export interface FilamentTypeProps {
  onFinished?: (values: any) => void;
  open?: boolean;
  editId?: string;
  onClose?: () => void;
  onDetailLoading?: (loading: boolean) => void;
}

const FilamentTypeHandle: FC<FilamentTypeProps> = (props) => {
  const { onFinished, open, editId, onClose, onDetailLoading } = props;
  const ref = useRef<ProFormInstance>();

  const { data, loading, run } = useRequest(getFilamentTypeDetail, {
    manual: true,
  });

  useEffect(() => {
    if (editId) {
      run(editId);
    }
  }, [editId]);

  useEffect(() => {
    if (data) {
      ref.current?.setFieldsValue(data as any);
    }
  }, [data]);

  useEffect(() => {
    onDetailLoading?.(loading);
  }, [loading]);

  return (
    <BetaSchemaForm
      {...baseFormItemLayout}
      loading={loading}
      formRef={ref}
      open={open}
      layoutType="ModalForm"
      onOpenChange={(open) => {
        if (!open) {
          onClose?.();
        }
        ref.current?.resetFields();
      }}
      title={editId ? "修改耗材类型" : "新增耗材类型"}
      trigger={<Button type="primary">新增耗材类型</Button>}
      onFinish={(values) => {
        return new Promise((resolve) => {
          (editId ? putFilamentType(editId, values) : postFilamentType(values))
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
          title: "耗材类型名称",
          dataIndex: "name",
          valueType: "text",
          formItemProps: {
            rules: [
              {
                required: true,
                message: "请填写耗材类型名称",
              },
            ],
          },
        },
        {
          title: "耗材类型描述",
          dataIndex: "description",
          valueType: "textarea",
        },
      ]}
    />
  );
};

export default FilamentTypeHandle;
