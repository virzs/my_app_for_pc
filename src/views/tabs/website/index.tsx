import TablePageContainer from "@/components/containter/table";
import TablePage from "@/components/TablePage";
import Operation from "@/components/TablePage/Operation";
import { ProColumns } from "@ant-design/pro-components";
import { message, Modal } from "antd";
import WebsiteHandle from "./handle";
import { useTablePage } from "@/hooks/useTablePage";
import { useState } from "react";
import { deleteWebsite, getWebsiteList } from "@/services/tabs/website";
import { useRequest } from "ahooks";

const { useModal } = Modal;

const Website = () => {
  const [modal, contextHolder] = useModal();
  const table = useTablePage(getWebsiteList);

  const { refresh } = table;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | undefined>(undefined);

  const { runAsync: delRun } = useRequest(deleteWebsite, {
    manual: true,
    onSuccess: () => {
      message.success("删除成功");
      refresh();
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
      title: "URL",
      search: false,
      dataIndex: "url",
    },
    {
      title: "图标",
      search: false,
      dataIndex: "icon",
    },
    {
      title: "点击量",
      search: false,
      dataIndex: "click",
    },
    {
      title: "是否启用",
      search: false,
      dataIndex: "enable",
      render: (text) => (text ? "是" : "否"),
    },
    {
      title: "是否公开",
      search: false,
      dataIndex: "public",
      render: (text) => (text ? "是" : "否"),
    },
    {
      title: "所属分类",
      search: false,
      dataIndex: "classify",
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
      <TablePage
        rowKey="_id"
        search={{
          filterType: "light",
        }}
        table={table}
        columns={columns}
        toolBarRender={() => {
          return [
            <WebsiteHandle
              open={open}
              editId={editId}
              onFinished={() => {
                refresh();
              }}
              onClose={() => {
                setOpen(false);
                setEditId(undefined);
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

export default Website;
