import TablePageContainer from "@/components/containter/table";
import TablePage from "@/components/TablePage";
import Operation from "@/components/TablePage/Operation";
import { useTablePage } from "@/hooks/useTablePage";
import {
  delWebsiteClassify,
  getWebsiteClassify,
} from "@/services/tabs/website_classifty";
import { ProColumns } from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { message, Modal } from "antd";
import { useState } from "react";
import ClassifyHandle from "./handle";

const { useModal } = Modal;

const WebsiteClassify = () => {
  const [modal, contextHolder] = useModal();
  const table = useTablePage(getWebsiteClassify);

  const { refresh } = table;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const [parent, setParent] = useState<string | undefined>(undefined);

  const { loading: delLoading, runAsync: delRun } = useRequest(
    delWebsiteClassify,
    {
      manual: true,
      onSuccess: () => {
        message.success("删除成功");
        refresh();
      },
    }
  );

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
      title: "图标",
      search: false,
      dataIndex: "icon",
    },
    {
      title: "是否启用",
      search: false,
      dataIndex: "enable",
      render: (text) => (text ? "是" : "否"),
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
                title: "新增子分类",
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
      <TablePage<any>
        rowKey="_id"
        search={{
          filterType: "light",
        }}
        table={table}
        columns={columns}
        pagination={false}
        toolBarRender={() => {
          return [
            <ClassifyHandle
              parent={parent}
              open={open}
              editId={editId}
              onFinished={() => {
                refresh();
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

export default WebsiteClassify;
