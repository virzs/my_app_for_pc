import TablePageContainer from "@/components/containter/table";
import TablePage, { TablePageProps } from "@/components/TablePage";
import Operation from "@/components/TablePage/Operation";
import { ProColumns } from "@ant-design/pro-components";
import { filesize } from "filesize";
import { FC } from "react";
import { Link } from "react-router-dom";
import { ResourcePaths } from "../router";

export interface BaseListPageProps extends TablePageProps<any, any> {}

const BaseListPage: FC<BaseListPageProps> = (props) => {
  const { ...rest } = props;

  const columns: ProColumns[] = [
    {
      title: "文件名",
      dataIndex: "name",
      render: (_, r) => (
        <Link to={ResourcePaths.r2Detail.replace(":id", r._id)}>{_}</Link>
      ),
    },
    {
      title: "文件类型",
      dataIndex: "mimetype",
    },
    {
      title: "文件大小",
      dataIndex: "size",
      render: (_) => filesize(_ as number),
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
      render: (_, r) => {
        return (
          <Operation
            columns={[
              {
                type: "link",
                title: "替换",
                tooltip: {
                  title: "替换文件将会影响所有关联的数据",
                },
                confirm: {
                  type: "warning",
                  title: "替换文件",
                  content: "替换文件将会影响所有关联的数据，请谨慎操作",
                  okText: "确认",
                  cancelText: "取消",
                  onOk: () => {},
                },
              },
              {
                type: "link",
                title: "删除",
                danger: true,
                confirm: {
                  type: "error",
                  title: "确认删除?",
                  content: "删除文件将会影响所有关联的数据，请谨慎操作",
                  okText: "确认",
                  cancelText: "取消",
                  onOk: () => {},
                },
              },
            ]}
          />
        );
      },
    },
  ];

  return (
    <TablePageContainer>
      <TablePage columns={columns} {...rest} />
    </TablePageContainer>
  );
};

export default BaseListPage;
