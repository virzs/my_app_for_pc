import TablePageContainer from "@/components/containter/table";
import TablePage from "@/components/TablePage";
import Operation from "@/components/TablePage/Operation";
import { useTablePage } from "@/hooks/useTablePage";
import { deleteFaq, getFaqList, publicFaq } from "@/services/feedback/faq";
import { RiAddLine } from "@remixicon/react";
import { useRequest } from "ahooks";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { FeedbackPaths } from "../router";

const FeedbackFaqPage = () => {
  const table = useTablePage(getFaqList);

  const { refresh } = table;

  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const { runAsync: publicRunAsync } = useRequest(publicFaq, {
    manual: true,
    onSuccess: () => {
      messageApi.success("操作成功");
      refresh();
    },
  });

  const { runAsync: delRunAsync } = useRequest(deleteFaq, {
    manual: true,
    onSuccess: () => {
      messageApi.success("删除成功");
      refresh();
    },
  });

  return (
    <TablePageContainer>
      <TablePage
        table={table}
        columns={[
          {
            title: "问题",
            dataIndex: "question",
          },
          {
            title: "是否公开",
            dataIndex: "isPublic",
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
            title: "操作 ",
            dataIndex: "operation",
            render: (_, record) => {
              return (
                <Operation
                  columns={[
                    {
                      title: !record.isPublic ? "公开" : "取消公开",
                      confirm: {
                        title: !record.isPublic
                          ? "确认公开吗？"
                          : "确认取消公开吗？",
                      },
                      onClick: () => {
                        return publicRunAsync(record._id);
                      },
                    },
                    {
                      title: "编辑",
                      onClick: () => {
                        navigate(`${FeedbackPaths.faqHandle}/${record._id}`);
                      },
                    },
                    {
                      title: "删除",
                      confirm: "delete",
                      onClick: () => {
                        return delRunAsync(record._id);
                      },
                    },
                  ]}
                />
              );
            },
          },
        ]}
        toolBarRender={() => {
          return [
            <Button
              onClick={() => {
                navigate(FeedbackPaths.faqHandle);
              }}
              icon={<RiAddLine size={16} />}
              type="primary"
            >
              新增
            </Button>,
          ];
        }}
      />
      {contextHolder}
    </TablePageContainer>
  );
};

export default FeedbackFaqPage;
