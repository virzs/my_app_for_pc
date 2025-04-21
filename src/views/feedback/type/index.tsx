import TablePageContainer from "@/components/containter/table";
import TablePage from "@/components/TablePage";
import { useTablePage } from "@/hooks/useTablePage";
import { deleteType, getTypeList } from "@/services/feedback/type";
import { RiAddLine } from "@remixicon/react";
import { Button, message } from "antd";
import { FeedbackPaths } from "../router";
import { useNavigate } from "react-router-dom";
import Operation from "@/components/TablePage/Operation";
import { useRequest } from "ahooks";

const FeedbackTypePage = () => {
  const table = useTablePage(getTypeList);

  const { refresh } = table;

  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const { runAsync: delRunAsync } = useRequest(deleteType, {
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
            title: "类型",
            dataIndex: "type",
          },
          {
            title: "描述",
            dataIndex: "description",
          },
          {
            title: "处理人",
            dataIndex: "handler",
          },
          {
            title: "是否启用",
            dataIndex: "enable",
            renderText: (value) => (value ? "是" : "否"),
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
            render: (_, r) => {
              return (
                <Operation
                  columns={[
                    {
                      title: "编辑",
                      onClick: () => {
                        navigate(`${FeedbackPaths.typeHandle}/${r._id}`);
                      },
                    },
                    {
                      title: "删除",
                      confirm: "delete",
                      onClick: () => {
                        return delRunAsync(r._id);
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
                navigate(FeedbackPaths.typeHandle);
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

export default FeedbackTypePage;
