import TablePageContainer from "@/components/containter/table";
import {
  deletePermission,
  getPermissionTree,
} from "@/services/system/permission";
import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import PermissionHandle from "./handle";
import { useRef, useState } from "react";
import { Modal, message } from "antd";
import Operation from "@/components/TablePage/Operation";
import { useRequest } from "ahooks";

const { useModal } = Modal;

const Permission = () => {
  const [modal, contextHolder] = useModal();
  const actionRef = useRef<ActionType>();

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [parent, setParent] = useState<string | undefined>(undefined);

  const { loading: delLoading, run: delRun } = useRequest(deletePermission, {
    manual: true,
    onSuccess: () => {
      message.success("删除成功");
      actionRef.current?.reload();
    },
  });

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
          <Operation
            columns={[
              {
                title: "新增子权限",
                onClick: () => {
                  setParent(record._id);
                  setOpen(true);
                },
              },
              {
                title: "修改",
                onClick: () => {
                  setOpen(true);
                  setEditId(record._id);
                },
              },
              {
                title: "删除",
                onClick: () => {
                  modal.confirm({
                    title: "确认删除?",
                    content: "删除后不可恢复",
                    onOk: async () => {
                      await delRun(record._id);
                    },
                  });
                },
                danger: true,
              },
            ]}
          />
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
      {contextHolder}
    </TablePageContainer>
  );
};

export default Permission;
