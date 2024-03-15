import BasePageContainer from "@/components/containter/base";
import { getPermissionTree } from "@/services/system/permission";
import {
  RoleRequest,
  detailRolePermissions,
  postRole,
  putRole,
} from "@/services/system/role";
import { baseFormItemLayout } from "@/utils/utils";
import {
  BetaSchemaForm,
  ProCard,
  ProFormInstance,
} from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { message } from "antd";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RoleHandle = () => {
  const navigate = useNavigate();

  const { data: pData = [], loading: pLoading } = useRequest(getPermissionTree);

  const { id } = useParams();

  const ref = useRef<ProFormInstance<RoleRequest>>();

  const { data, loading, run } = useRequest(detailRolePermissions, {
    manual: true,
  });

  useEffect(() => {
    if (id) {
      run(id);
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      ref.current?.setFieldsValue({
        ...data,
      } as any);
    }
  }, [data]);

  return (
    <BasePageContainer>
      <div className="max-w-5xl mx-auto">
        <ProCard>
          <BetaSchemaForm<RoleRequest>
            loading={pLoading || loading}
            {...baseFormItemLayout}
            formRef={ref}
            submitter={{
              searchConfig: {
                submitText: "保存",
              },
              render(_, dom) {
                return (
                  <div className="flex items-center justify-center gap-2">
                    {...dom}
                  </div>
                );
              },
            }}
            onFinish={(values) => {
              return new Promise((resolve) => {
                (id ? putRole(id, values) : postRole(values))
                  .then(() => {
                    message.success(id ? "修改成功" : "新增成功");
                    resolve(true);
                    ref.current?.resetFields();
                    navigate(-1);
                  })
                  .catch(() => {
                    resolve(false);
                  });
              });
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
                      message: "名称不能为空",
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
                title: "权限",
                dataIndex: "permissions",
                // @ts-ignore
                valueType: "tree",
                valueEnum: pData,
              },
            ]}
          />
        </ProCard>
      </div>
    </BasePageContainer>
  );
};

export default RoleHandle;
