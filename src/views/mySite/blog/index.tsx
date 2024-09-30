import TablePage from "@/components/TablePage";
import { useTablePage } from "@/hooks/useTablePage";
import { deleteBlog, getBlogList, publishBlog } from "@/services/mySite/blog";
import { ProColumns } from "@ant-design/pro-components";
import { Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { MySitePaths } from "../router";
import { RiAddLine } from "@remixicon/react";
import Operation from "@/components/TablePage/Operation";
import { useRequest } from "ahooks";

const Blog = () => {
  const table = useTablePage(getBlogList);
  const navigate = useNavigate();

  const { refresh } = table;

  const { run: delRun } = useRequest(deleteBlog, {
    manual: true,
    onSuccess: () => {
      refresh();
      message.success("删除成功");
    },
  });

  const { run: publishRun } = useRequest(publishBlog, {
    manual: true,
    onSuccess: () => {
      refresh();
      message.success("操作成功");
    },
  });

  const columns: ProColumns[] = [
    {
      title: "标题",
      dataIndex: "title",
      render: (text, record) => {
        return (
          <Link to={MySitePaths.blogDetail + "/" + record._id}>{text}</Link>
        );
      },
    },
    {
      title: "是否发布",
      dataIndex: "isPublish",
      render: (text) => (text ? "是" : "否"),
    },
    {
      title: "创建人",
      dataIndex: "creator",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
    },
    {
      title: "更新人",
      dataIndex: "updater",
    },
    {
      title: "更新时间",
      dataIndex: "updatedAt",
    },
    {
      title: "操作",
      dataIndex: "operation",
      render: (_, record) => {
        return (
          <Operation
            columns={[
              {
                title: !record.isPublish ? "发布" : "取消发布",
                confirm: {
                  title: !record.isPublish
                    ? "确认发布吗？"
                    : "确认取消发布吗？",
                },
                onClick: () => {
                  publishRun(record._id);
                },
              },
              {
                title: "编辑",
                onClick: () => {
                  navigate(MySitePaths.blogHandle + "/" + record._id);
                },
              },
              {
                title: "删除",
                confirm: "delete",
                onClick: () => {
                  delRun(record._id);
                },
              },
            ]}
          />
        );
      },
    },
  ];

  return (
    <TablePage
      table={table}
      columns={columns}
      toolBarRender={() => {
        return [
          <Button
            onClick={() => {
              navigate(MySitePaths.blogHandle);
            }}
            icon={<RiAddLine size={16} />}
            type="primary"
          >
            新增
          </Button>,
        ];
      }}
    />
  );
};

export default Blog;
