import { useTablePage } from "@/hooks/useTablePage";
import { RoleRequest, deleteRole, getRole } from "@/services/system/role";
import TablePage, { TablePageProps } from "@/components/TablePage";
import TablePageContainer from "@/components/containter/table";
import { ProCard } from "@ant-design/pro-components";
import { Space, message } from "antd";
import { useRequest } from "ahooks";
import Operation from "@/components/TablePage/Operation";

const Role = () => {
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
      title: "权限",
      dataIndex: "permissions",
      key: "permissions",
      render: (v: any) => v.length,
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
              },
              {
                title: "删除",
              },
            ]}
          />
        );
      },
    },
  ];

  return (
    <TablePageContainer>
      <TablePage
        table={table}
        columns={columns}
        renderItem={(item: any) => {
          return <ProCard className="mb-2" title={item.name} />;
        }}
      />
    </TablePageContainer>
  );
};

export default Role;
