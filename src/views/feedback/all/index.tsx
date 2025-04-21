import TablePageContainer from "@/components/containter/table";
import TablePage from "@/components/TablePage";

const FeedbackAllPage = () => {
  return (
    <TablePageContainer>
      <TablePage
        columns={[
          {
            title: "标题",
            dataIndex: "title",
          },
          {
            title: "类型",
            dataIndex: "type",
          },
          {
            title: "反馈人",
            dataIndex: "creator",
          },
          {
            title: "反馈时间",
            dataIndex: "createdAt",
          },
          {
            title: "状态",
            dataIndex: "status",
          },
          {
            title: "操作 ",
            dataIndex: "operation",
            render: (value) => {
              return (
                <div>
                  <a>详情</a>
                </div>
              );
            },
          },
        ]}
      />
    </TablePageContainer>
  );
};

export default FeedbackAllPage;
