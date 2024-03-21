import { useTablePage } from "@/hooks/useTablePage";
import { RoleRequest, deleteRole, getRole } from "@/services/system/role";
import TablePage, { TablePageProps } from "@/components/TablePage";
import TablePageContainer from "@/components/containter/table";
import { ProCard } from "@ant-design/pro-components";
import { Button, message } from "antd";
import { useRequest } from "ahooks";
import Operation from "@/components/TablePage/Operation";
import { useNavigate } from "react-router-dom";
import { SystemPaths } from "../router";

const Role = () => {
  const navigate = useNavigate();

  const table = useTablePage<RoleRequest[]>(getRole);

  const { refresh } = table;

  const { loading: delLoading, run: delRun } = useRequest(deleteRole, {
    manual: true,
    onSuccess: () => {
      message.success("删除成功");
      refresh();
    },
  });

  const columns: TablePageProps<RoleRequest, any>["columns"] = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "权限",
      dataIndex: "permissions",
      key: "permissions",
      render: (v: any) => v.length,
    },
    {
      title: "创建人",
      dataIndex: "creator",
      key: "creator",
      render: (v: any) => v?.username,
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "更新人",
      dataIndex: "updater",
      key: "updater",
      render: (v: any) => v?.username ?? "-",
    },
    {
      title: "更新时间",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (_, r) => {
        const { _id } = r;
        return (
          <Operation
            columns={[
              {
                title: "修改",
                onClick: () => {
                  navigate(SystemPaths.roleHandle + "/" + _id);
                },
              },
              {
                title: "删除",
                loading: delLoading,
                onClick: () => delRun(_id!),
                danger: true,
                confirm: "delete",
              },
            ]}
          />
        );
      },
    },
  ];

  return (
    <TablePageContainer
      header={{
        extra: [
          <Button
            type="primary"
            onClick={() => {
              navigate(SystemPaths.roleHandle);
            }}
          >
            新增角色
          </Button>,
        ],
      }}
    >
      <TablePage
        table={table}
        columns={columns}
        renderItem={(item: any) => {
          return <ProCard className="mb-2" title={item.name} />;
        }}
        rowClassName="cursor-pointer"
        onRow={(r) => ({
          onClick: () => {
            navigate(SystemPaths.role + "/" + r._id);
          },
        })}
      />
    </TablePageContainer>
  );
};

export default Role;
