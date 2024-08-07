import TablePageContainer from "@/components/containter/table";
import TablePage from "@/components/TablePage";
import Operation from "@/components/TablePage/Operation";
import { ProColumns } from "@ant-design/pro-components";
import { message } from "antd";
import WebsiteHandle from "./handle";
import { useTablePage } from "@/hooks/useTablePage";
import { useState } from "react";
import {
  deleteWebsite,
  getWebsiteList,
  updateWebsitePublic,
} from "@/services/tabs/website";
import { useRequest } from "ahooks";

const Website = () => {
  const table = useTablePage(getWebsiteList);

  const { refresh } = table;

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | undefined>(undefined);

  const { runAsync: publicRun } = useRequest(updateWebsitePublic, {
    manual: true,
    onSuccess: () => {
      message.success("操作成功");
      refresh();
    },
  });

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
                title: record.public ? "取消公开" : "公开",
                onClick: async () => {
                  await publicRun({
                    ids: [record._id],
                    isPublic: !record.public,
                  });
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
                onClick: async () => {
                  await delRun(record._id);
                },
                confirm: "delete",
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
            />,
          ];
        }}
      />
    </TablePageContainer>
  );
};

export default Website;
