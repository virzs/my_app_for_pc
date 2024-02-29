import BasePageContainer from "@/components/containter/base";
import { getInvitationCode, putForbidden } from "@/services/user";
import { ProCard } from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { Button, Space, Table, Tag, Tooltip, message } from "antd";
import { format } from "date-fns";
import {
  getInvitationCodeStatusColor,
  getInvitationCodeStatusLabel,
} from "../utils";
import HandleCode from "./handleCode";
import { useState } from "react";
import { getUserInfo } from "@/utils/userInfo";

const UserCenter = () => {
  const [open, setOpen] = useState(false);
  const { type } = getUserInfo();

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

  return (
    <BasePageContainer>
      <Space direction="vertical" className="w-full">
        <ProCard title="我的信息"></ProCard>
        <ProCard
          title="我的邀请码"
          extra={
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
              }}
            >
              创建
            </Button>
          }
        >
          <Table
            loading={loading}
            dataSource={data}
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
                          ? roles.map(({ name }, j) => (
                              <Tag key={j}>{name}</Tag>
                            ))
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
                render: (expire: string) =>
                  expire ? format(expire, "yyyy-MM-dd") : "",
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
                    <Space>
                      {[0].includes(status) && (
                        <Tooltip title="点击复制邀请链接">
                          <Button
                            type="text"
                            size="small"
                            onClick={() => {
                              // 当前域名+/register?code=邀请码
                              const url = `${window.location.origin}/register?code=${code}`;
                              navigator.clipboard.writeText(url);
                              message.success("邀请链接已复制到剪贴板");
                            }}
                          >
                            邀请链接
                          </Button>
                        </Tooltip>
                      )}
                      {![2].includes(status) && (
                        <Button
                          loading={forbiddenLoading}
                          type="text"
                          size="small"
                          style={{ color: "red" }}
                          onClick={() => {
                            forbidden(_id);
                          }}
                        >
                          禁用
                        </Button>
                      )}
                    </Space>
                  );
                },
              },
            ]}
          />
        </ProCard>
      </Space>
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
    </BasePageContainer>
  );
};

export default UserCenter;
