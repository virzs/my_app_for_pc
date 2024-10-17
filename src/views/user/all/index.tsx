import { useTablePage } from "@/hooks/useTablePage";
import { getUsers, putEnable } from "@/services/user";
import { ProCard } from "@ant-design/pro-components";
import { Tag, message } from "antd";
import {
  getUserStatusColor,
  getUserStatusLabel,
  getUserTypeColor,
  getUserTypeLabel,
} from "../utils";
import TablePage, { TablePageProps } from "@/components/TablePage";
import TablePageContainer from "@/components/containter/table";
import { useRequest } from "ahooks";

const User = () => {
  const table = useTablePage(getUsers);

  const { refresh } = table;

  const { run } = useRequest(putEnable, {
    manual: true,
    onSuccess: () => {
      refresh();
      message.success("操作成功");
    },
  });

  const columns: TablePageProps<any, any>["columns"] = [
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
      render: (text: any) => {
        return (
          <Tag color={getUserTypeColor(text)}>{getUserTypeLabel(text)}</Tag>
        );
      },
    },
    {
      title: "角色",
      dataIndex: "roles",
      key: "roles",
      render: (text: any) => {
        return text.map((i: any) => <Tag>{i.name}</Tag>);
      },
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (_) => (
        <Tag color={getUserStatusColor(_ as number)}>
          {getUserStatusLabel(_ as number)}
        </Tag>
      ),
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (_, r) => {
        const { _id, enable } = r;
        return (
          <a
            onClick={() => {
              run(_id);
            }}
            style={{
              color: enable ? "red" : "green",
            }}
          >
            {enable ? "禁用" : "启用"}
          </a>
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
          return (
            <ProCard
              className="mb-2"
              title={item.username}
              subTitle={item.email}
              extra={
                <Tag color={getUserTypeColor(item.type)}>
                  {getUserTypeLabel(item.type)}
                </Tag>
              }
            />
          );
        }}
      />
    </TablePageContainer>
  );
};

export default User;
