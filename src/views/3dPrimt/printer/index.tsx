import { ProList } from "@ant-design/pro-components";
import { Space, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { TDPrintPaths } from "../router";
import BasePageContainer from "../../../components/containter/base";

const Printer = () => {
  const navigate = useNavigate();

  const defaultData = [
    {
      id: "1",
      name: "Bambu Lab P1S",
      image:
        "https://store.bambulab.com/cdn/shop/files/2_15f7543a-9a3c-44ea-b9b6-78fdee76ae36_1000x.jpg?v=1691738695",
      desc: "全封闭机箱，提升高性能材料打印表现。",
    },
  ];

  return (
    <BasePageContainer>
      <ProList
        dataSource={defaultData}
        metas={{
          title: {
            dataIndex: "name",
          },
          avatar: {
            dataIndex: "image",
            editable: false,
          },
          description: {
            dataIndex: "desc",
          },
          subTitle: {
            render: () => {
              return (
                <Space size={0}>
                  <Tag color="blue">Ant Design</Tag>
                  <Tag color="#5BD8A6">TechUI</Tag>
                </Space>
              );
            },
          },
          actions: {
            render: (text, row, index, action) => [
              <a
                onClick={() => {
                  navigate(TDPrintPaths.printerDetail.replace(":id", row.id));
                }}
                key="link"
              >
                编辑
              </a>,
            ],
          },
        }}
      />
    </BasePageContainer>
  );
};

export default Printer;
