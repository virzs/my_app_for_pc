import { getInvitationCode, putForbidden } from "@/services/user";
import { ProDescriptions, ProTable } from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { Button, Space, Tag, message } from "antd";
import { format } from "date-fns";
import {
  getInvitationCodeStatusColor,
  getInvitationCodeStatusLabel,
} from "../utils";
import HandleCode from "./handleCode";
import { useMemo, useState } from "react";
import { getUserInfo } from "@/utils/userInfo";
import Operation from "@/components/TablePage/Operation";
import FullPageContainer from "@/components/containter/full";

const UserCenter = () => {
  const [open, setOpen] = useState(false);
  const { type, email, username } = getUserInfo();

  const { data, loading, refresh } = useRequest(getInvitationCode);

  const { loading: forbiddenLoading, run: forbidden } = useRequest(
    putForbidden,
    {
      manual: true,
      onSuccess: () => {
        message.success("禁用成功");
        refresh();
      },
    }
  );

  const sortedData = useMemo(() => {
    // 排序 status 0 1 2
    return data?.sort((a: any, b: any) => a.status - b.status);
  }, [data]);

  return (
    <FullPageContainer>
      <ProDescriptions title="我的信息">
        <ProDescriptions.Item label="用户名">{username}</ProDescriptions.Item>
        <ProDescriptions.Item label="邮箱">{email}</ProDescriptions.Item>
      </ProDescriptions>
      <ProDescriptions title="我的邀请码">
        <ProTable
          className="w-full"
          cardProps={{
            bodyStyle: {
              padding: 0,
            },
          }}
          search={false}
          options={{
            density: false,
            setting: false,
            reload: () => {
              refresh();
            },
          }}
          toolBarRender={() => (
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  setOpen(true);
                }}
              >
                创建
              </Button>
            </Space>
          )}
          loading={loading}
          dataSource={sortedData}
          size="small"
          pagination={false}
          columns={[
            {
              title: "邀请码",
              dataIndex: "code",
              key: "code",
            },
            ...(type === 0
              ? [
                  {
                    title: "默认角色",
                    dataIndex: "roles",
                    key: "roles",
                    render: (roles: any[]) =>
                      roles?.length
                        ? roles.map(({ name }, j) => <Tag key={j}>{name}</Tag>)
                        : "",
                  },
                ]
              : []),
            {
              title: "已使用次数",
              dataIndex: "useCount",
              key: "useCount",
            },
            {
              title: "最大使用次数",
              dataIndex: "maxUse",
              key: "maxUse",
            },
            {
              title: "有效期",
              dataIndex: "expire",
              key: "expire",
              render: (expire) =>
                expire !== "-" ? format(expire as string, "yyyy-MM-dd") : "",
            },
            {
              title: "状态",
              dataIndex: "status",
              key: "status",
              render: (status: number) => {
                return (
                  <Tag
                    bordered={false}
                    color={getInvitationCodeStatusColor(status)}
                  >
                    {getInvitationCodeStatusLabel(status)}
                  </Tag>
                );
              },
            },
            {
              title: "操作",
              dataIndex: "operation",
              key: "operation",
              width: 200,
              render: (_, { _id, status, code }) => {
                return (
                  <Operation
                    columns={[
                      {
                        show: [0].includes(status),
                        tooltip: {
                          title: "点击复制邀请链接",
                        },
                        onClick: () => {
                          // 当前域名+/register?code=邀请码
                          const url = `${window.location.origin}/register?code=${code}`;
                          navigator.clipboard.writeText(url);
                          message.success("邀请链接已复制到剪贴板");
                        },
                        title: "邀请链接",
                      },
                      {
                        show: ![2].includes(status),
                        onClick: () => {
                          forbidden(_id);
                        },
                        title: "禁用",
                        loading: forbiddenLoading,
                      },
                    ]}
                  />
                );
              },
            },
          ]}
        />
      </ProDescriptions>
      <HandleCode
        type={type}
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        onOk={() => {
          setOpen(false);
          refresh();
        }}
      />
    </FullPageContainer>
  );
};

export default UserCenter;
