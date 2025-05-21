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
import { message, Modal, Image } from "antd";
import { useState } from "react";
import ClassifyHandle from "./handle";

const { useModal } = Modal;

const WebsiteClassify = () => {
  const [modal, contextHolder] = useModal();
  const table = useTablePage(getWebsiteClassify);

  const { refresh } = table;

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const [parent, setParent] = useState<string | undefined>(undefined);

  const { runAsync: delRun } = useRequest(delWebsiteClassify, {
    manual: true,
    onSuccess: () => {
      message.success("删除成功");
      refresh();
    },
  });

  const columns: ProColumns[] = [
    {
      title: "名称",
      ellipsis: true,
      dataIndex: "name",
      render: (text, r) => {
        return (
          <div className="flex gap-2 items-center">
            {r.icon?.url ? (
              <Image
                preview={false}
                loading="lazy"
                src={r.icon.url}
                alt=""
                style={{ width: 36, height: 36 }}
              />
            ) : (
              ""
            )}
            {text}
          </div>
        );
      },
    },
    {
      title: "描述",
      search: false,
      ellipsis: true,
      dataIndex: "description",
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
      fixed: "right",
      render: (_, record) => {
        return (
          <Operation
            columns={[
              {
                title: "新增子分类",
                show: !record.parent,
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
        order={false}
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
            />,
          ];
        }}
      />
      {contextHolder}
    </TablePageContainer>
  );
};

export default WebsiteClassify;
