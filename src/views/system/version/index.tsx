import TablePage, { TablePageProps } from "@/components/TablePage";
import Operation from "@/components/TablePage/Operation";
import TablePageContainer from "@/components/containter/table";
import { useTablePage } from "@/hooks/useTablePage";
import { deleteVersion, getVersion } from "@/services/system/version";
import { Button, Space, Tag, message } from "antd";
import { SystemPaths } from "../router";
import { useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";
import { PlusOutlined } from "@ant-design/icons";
import { getPlatformDicLabel, getUpdateTypeDicLabel } from "./dic";

const Version = () => {
  const navigate = useNavigate();
  const table = useTablePage(getVersion);

  const { refresh } = table;

  const { loading: delLoading, run: delRun } = useRequest(deleteVersion, {
    manual: true,
    onSuccess: () => {
      message.success("删除成功");
      refresh();
    },
  });

  const columns: TablePageProps<any, any>["columns"] = [
    {
      title: "版本号",
      dataIndex: "version",
      key: "version",
    },
    {
      title: "发布平台",
      dataIndex: "platform",
      key: "platform",
      render: (_, r) => (
        <Space>
          {r.platforms.map((i: any) => (
            <Tag>
              {getPlatformDicLabel(i.platform)} (
              {getUpdateTypeDicLabel(i.updateType)})
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "预定发布日期",
      dataIndex: "releaseTime",
      key: "releaseTime",
      render: (v) => {
        return v === "-" ? "立即生效" : v;
      },
    },
    {
      title: "创建人",
      dataIndex: "creator",
      key: "creator",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "更新人",
      dataIndex: "updater",
      key: "updater",
    },
    {
      title: "更新时间",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      render: (_, r) => {
        const { _id } = r;
        return (
          <Operation
            columns={[
              {
                title: "修改",
                onClick: () => {
                  navigate(SystemPaths.versionHandle + "/" + r._id);
                },
              },
              {
                title: "删除",
                loading: delLoading,
                danger: true,
                confirm: "delete",
                onClick: () => delRun(_id),
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
        headerTitle={
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                navigate(SystemPaths.versionHandle);
              }}
            >
              新增版本
            </Button>
          </Space>
        }
        rowClassName="cursor-pointer"
        onRow={(r) => ({
          onClick: () => {
            navigate(SystemPaths.version + "/" + r._id);
          },
        })}
      />
    </TablePageContainer>
  );
};

export default Version;
