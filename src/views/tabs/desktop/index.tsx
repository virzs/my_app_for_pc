import TablePageContainer from "@/components/containter/table";
import TablePage from "@/components/TablePage";
import Operation from "@/components/TablePage/Operation";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { RiAddLine } from "@remixicon/react";
import { TabsPaths } from "../router";

const Desktop = () => {
  const navigate = useNavigate();

  return (
    <TablePageContainer>
      <TablePage
        columns={[
          {
            title: "名称",
            dataIndex: "name",
          },
          {
            title: "描述",
            dataIndex: "description",
          },
          {
            title: "角色",
            dataIndex: "role",
          },
          {
            title: "操作",
            dataIndex: "action",
            render: () => {
              return (
                <Operation
                  columns={[
                    {
                      title: "预览",
                    },
                    {
                      title: "修改",
                    },
                    {
                      title: "删除",
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
              type="primary"
              icon={<RiAddLine size={22} />}
              onClick={() => {
                navigate(TabsPaths.desktopHandle);
              }}
            >
              新增
            </Button>,
          ];
        }}
      />
    </TablePageContainer>
  );
};

export default Desktop;
