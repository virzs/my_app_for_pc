import TablePageContainer from "@/components/containter/table";
import { getPermissionTree } from "@/services/system/permission";
import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import PermissionHandle from "./handle";
import { useRef, useState } from "react";
import { Button, Space } from "antd";

const Permission = () => {
  const actionRef = useRef<ActionType>();

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [parent, setParent] = useState<string | undefined>(undefined);

  const columns: ProColumns[] = [
    {
      title: "名称",
      dataIndex: "name",
    },
    {
      title: "描述",
      search: false,
      dataIndex: "description",
    },
    {
      title: "请求方式",
      search: false,
      dataIndex: "method",
    },
    {
      title: "URL",
      search: false,
      dataIndex: "url",
    },
    {
      title: "类型",
      search: false,
      dataIndex: "type",
    },
    {
      title: "操作",
      search: false,
      dataIndex: "action",
      width: 120,
      render: (_, record) => {
        return (
          <Space>
            <Button
              type="link"
              size="small"
              onClick={() => {
                setParent(record._id);
                setOpen(true);
              }}
            >
              新增子权限
            </Button>
            <Button
              loading={loading && editId === record._id}
              type="link"
              size="small"
              onClick={() => {
                setOpen(true);
                setEditId(record._id);
              }}
            >
              修改
            </Button>
            <Button type="link" size="small" danger>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <TablePageContainer>
      <ProTable<any>
        rowKey="_id"
        search={{
          filterType: "light",
        }}
        request={async (params) => {
          console.log(params);
          const result = await getPermissionTree(params);
          return {
            data: result,
            success: true,
          };
        }}
        // virtual
        columns={columns}
        pagination={false}
        actionRef={actionRef}
        toolBarRender={() => {
          return [
            <PermissionHandle
              parent={parent}
              open={open}
              editId={editId}
              onFinished={() => {
                actionRef.current?.reload();
              }}
              onClose={() => {
                setOpen(false);
                setEditId(undefined);
                setParent(undefined);
              }}
              onDetailLoading={(loading) => {
                setLoading(loading);
              }}
            />,
          ];
        }}
      />
    </TablePageContainer>
  );
};

export default Permission;
