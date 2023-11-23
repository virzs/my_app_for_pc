import {
  getFilamentDetail,
  postFilament,
  putFilament,
} from "@/services/3dPrint/filament";
import { getSupplierList } from "@/services/3dPrint/supplier";
import { The3DPrintSupplier } from "@/services/3dPrint/supplier.interface";
import { baseFormItemLayout } from "@/utils/utils";
import {
  BetaSchemaForm,
  ProCard,
  ProFormInstance,
} from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { Button, Space, Tag, message } from "antd";
import { useEffect, useRef } from "react";

export interface HandleModalProps<T> {
  onFinished?: (values: T) => void;
  open?: boolean;
  editId?: string;
  onClose?: () => void;
  onDetailLoading?: (loading: boolean) => void;
}

function FilamentHandle<T>(props: HandleModalProps<T>) {
  const { onFinished, open, editId, onClose, onDetailLoading } = props;
  const ref = useRef<ProFormInstance<T>>();

  const { data, loading, run } = useRequest(getFilamentDetail, {
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
        supplier: data.supplier._id,
        type: data.type._id,
        filamentType: data.supplier.filamentType,
      } as any);
    }
  }, [data]);

  useEffect(() => {
    onDetailLoading?.(loading);
  }, [loading]);

  return (
    <BetaSchemaForm<any>
      {...baseFormItemLayout}
      loading={loading}
      formRef={ref}
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          onClose?.();
        }
        ref.current?.resetFields();
      }}
      title={editId ? "修改耗材" : "新增耗材"}
      trigger={<Button type="primary">新增耗材</Button>}
      layoutType="ModalForm"
      onFinish={(values) => {
        return new Promise((resolve) => {
          (editId ? putFilament(editId, values) : postFilament(values))
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
          title: "供应商",
          dataIndex: "supplier",
          valueType: "select",
          request: getSupplierList,
          fieldProps: {
            showSearch: true,
            fieldNames: { label: "name", value: "_id" },
            optionLabelProp: "name",
            optionItemRender: (i: The3DPrintSupplier) => {
              return (
                <Space direction="vertical">
                  <div>
                    <Space>
                      <span>{i.name}</span>
                      <span>{i.nameEn}</span>
                    </Space>
                  </div>
                  <div>
                    <Space>
                      {i.filamentType.map((k, l) => (
                        <Tag key={l}>{k.name}</Tag>
                      ))}
                    </Space>
                  </div>
                </Space>
              );
            },
            onChange: (_: string, r: The3DPrintSupplier) => {
              ref.current?.setFieldValue(
                "filamentType",
                r.filamentType ? r.filamentType : []
              );
              ref.current?.setFieldValue("type", undefined);
            },
          },
          formItemProps: {
            rules: [
              {
                required: true,
                message: "请选择供应商",
              },
            ],
          },
        },
        {
          title: "耗材类型",
          valueType: "select",
          dataIndex: "type",
          //   valueType: "dependency",
          dependencies: ["filamentType"],
          fieldProps: (form) => {
            const types = form.getFieldValue("filamentType");
            return {
              showSearch: true,
              options: types,
              fieldNames: { label: "name", value: "_id" },
            };
          },
          formItemProps: {
            rules: [
              {
                required: true,
                message: "请选择耗材类型",
              },
            ],
          },
        },
        {
          title: "标称重量",
          dataIndex: "nominalWeight",
          valueType: "digit",
          fieldProps: {
            addonAfter: "g",
            min: 0,
          },
          formItemProps: {
            rules: [
              {
                required: true,
                message: "请填写标称重量",
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
          title: "详细信息",
          valueType: "formList",
          dataIndex: "info",
          fieldProps: {
            creatorButtonProps: {
              creatorButtonText: "新增颜色",
            },
            alwaysShowItemLabel: true,
            itemRender: ({ listDom, action }: any) => {
              return (
                <ProCard className="mb-2" size="small" bordered extra={action}>
                  {listDom}
                </ProCard>
              );
            },
          },
          columns: [
            {
              title: "颜色",
              dataIndex: "color",
              valueType: "color",
              formItemProps: {
                rules: [
                  {
                    required: true,
                  },
                ],
                getValueFromEvent: (e: any) => {
                  return "#" + e.toHex();
                },
              },
              fieldProps: {
                colorFormat: "hex",
              },
            },
            {
              title: "价格",
              dataIndex: "price",
              valueType: "digit",
              formItemProps: {
                rules: [
                  {
                    required: true,
                  },
                ],
              },
              fieldProps: {
                addonAfter: "元",
              },
            },
          ],
        },
      ]}
    />
  );
}

export default FilamentHandle;
