import TablePageContainer from "@/components/containter/table";
import TablePage from "@/components/TablePage";
import Operation from "@/components/TablePage/Operation";
import { ProColumns } from "@ant-design/pro-components";
import { Image, message } from "antd";
import WebsiteHandle from "./handle";
import { useTablePage } from "@/hooks/useTablePage";
import { useState } from "react";
import {
  deleteWebsite,
  getWebsiteList,
  updateWebsitePublic,
} from "@/services/tabs/website";
import { useRequest } from "ahooks";
import { getWebsiteClassify } from "@/services/tabs/website_classifty";

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
      ellipsis: true,
      render: (text, r) => {
        return (
          <div className="flex gap-2 items-center">
            {r.icon?.url ? (
              <Image
                className="!w-9 !h-9 object-contain"
                preview={false}
                loading="lazy"
                src={r.icon.url}
                alt=""
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
      dataIndex: "description",
      ellipsis: true,
    },
    {
      title: "URL",
      dataIndex: "url",
      ellipsis: true,
    },
    {
      title: "主题色",
      dataIndex: "themeColor",
    },
    {
      title: "点击量",
      dataIndex: "click",
    },
    {
      title: "是否启用",
      dataIndex: "enable",
      render: (text) => (text ? "是" : "否"),
    },
    {
      title: "是否公开",
      dataIndex: "public",
      render: (text) => (text ? "是" : "否"),
    },
    {
      title: "所属分类",
      search: true,
      dataIndex: "classify",
      render: (_, r) => {
        return r.classify?.name;
      },
      valueType: "treeSelect",
      request: async () => {
        const result = await getWebsiteClassify({});
        const disabledParent = (d: any[]): any[] => {
          // 如果父节点子节点不为空禁用
          return d.map((item: any) => {
            if (item.children?.length) {
              return {
                ...item,
                disabled: true,
                children: disabledParent(item.children),
              };
            }
            return item;
          });
        };
        return disabledParent(result);
      },
      formItemProps: {
        name: "classifyIds",
      },
      fieldProps: {
        fieldNames: {
          label: "name",
          value: "_id",
        },
        multiple: true,
      },
    },
    {
      title: "操作",
      dataIndex: "action",
      fixed: "right",
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
