import {
  detailSupplier,
  getSupplierType,
  postSupplier,
  putSupplier,
} from "@/services/3dPrint/supplier";
import { BetaSchemaForm, ProFormInstance } from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { Button, message } from "antd";
import { useEffect, useRef } from "react";

export interface HandleModalProps<T> {
  onFinished?: (values: T) => void;
  open?: boolean;
  editId?: string;
  onClose?: () => void;
  onDetailLoading?: (loading: boolean) => void;
}

function HandleModal<
  T extends {
    name: string;
    nameEn?: string;
    logo: string;
    description: string;
    type: number[];
    url: string;
  }
>(props: HandleModalProps<T>) {
  const { onFinished, open, editId, onClose, onDetailLoading } = props;
  const ref = useRef<ProFormInstance<T>>();

  const { data, loading, run } = useRequest(detailSupplier, { manual: true });

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

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  return (
    <BetaSchemaForm<T>
      layout="horizontal"
      {...formItemLayout}
      loading={loading}
      formRef={ref}
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          onClose?.();
        }
        ref.current?.resetFields();
      }}
      title={editId ? "修改供应商" : "新增供应商"}
      trigger={<Button type="primary">新增供应商</Button>}
      layoutType="ModalForm"
      onFinish={(values) => {
        return new Promise((resolve) => {
          (editId ? putSupplier(editId, values) : postSupplier(values))
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
          title: "供应商名称",
          dataIndex: "name",
          valueType: "text",
          formItemProps: {
            rules: [
              {
                required: true,
                message: "请填写供应商名称",
              },
            ],
          },
        },
        {
          title: "供应商英文名称",
          dataIndex: "nameEn",
          valueType: "text",
        },
        {
          title: "供应商logo",
          dataIndex: "logo",
          valueType: "text",
        },
        {
          title: "供应商描述",
          dataIndex: "description",
          valueType: "text",
        },
        {
          title: "供应商类型",
          dataIndex: "type",
          valueType: "select",
          request: getSupplierType,
          fieldProps: {
            mode: "multiple",
            allowClear: true,
            fieldNames: { label: "name", value: "id" },
          },
          formItemProps: {
            rules: [
              {
                required: true,
                message: "请选择供应商类型",
              },
            ],
          },
        },
        {
          title: "供应商网址",
          dataIndex: "url",
          valueType: "text",
        },
      ]}
    />
  );
}

export default HandleModal;
