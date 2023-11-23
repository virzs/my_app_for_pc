import BasePageContainer from "@/components/containter/base";
import { getFilamentType } from "@/services/3dPrint/filamentType";
import {
  detailSupplier,
  getSupplierType,
  postSupplier,
  putSupplier,
} from "@/services/3dPrint/supplier";
import { baseFormItemLayout } from "@/utils/utils";
import {
  BetaSchemaForm,
  ProCard,
  ProFormInstance,
  ProFormUploadDragger,
} from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { Button, message } from "antd";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

export interface SupplierHandleProps {}

function SupplierHandle<
  T extends {
    name: string;
    nameEn?: string;
    logo: string;
    description: string;
    type: number[];
    url: string;
  }
>(props: SupplierHandleProps) {
  const ref = useRef<ProFormInstance<T>>();
  const navigate = useNavigate();

  const params = useParams();

  const { id } = params as any;

  const { data, loading, run } = useRequest(detailSupplier, { manual: true });

  useEffect(() => {
    if (id) {
      run(id);
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      ref.current?.setFieldsValue({
        ...data,
        filamentType: data.filamentType?.map((i) => i._id),
      } as any);
    }
  }, [data]);

  return (
    <BasePageContainer>
      <ProCard>
        <BetaSchemaForm<T>
          {...baseFormItemLayout}
          loading={loading}
          formRef={ref}
          layoutType="Form"
          onFinish={(values) => {
            return new Promise((resolve) => {
              (id ? putSupplier(id, values) : postSupplier(values))
                .then(() => {
                  message.success(id ? "修改成功" : "新增成功");
                  resolve(true);
                  ref.current?.resetFields();
                })
                .catch(() => {
                  resolve(false);
                });
            });
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
              valueType: "upload",
              fieldProps: {
                maxCount: 1,
              },
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
            {
              title: "耗材类型",
              dataIndex: "filamentType",
              valueType: "select",
              request: getFilamentType,
              fieldProps: {
                mode: "multiple",
                allowClear: true,
                fieldNames: { label: "name", value: "_id" },
              },
            },
          ]}
        />
      </ProCard>
    </BasePageContainer>
  );
}

export default SupplierHandle;
