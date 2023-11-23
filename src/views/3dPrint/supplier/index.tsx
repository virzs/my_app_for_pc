import BasePageContainer from "@/components/containter/base";
import { getSupplier } from "@/services/3dPrint/supplier";
import ListPage from "@/components/ListPage/list";
import { useTablePage } from "@/hooks/useTablePage";
import { ProCard } from "@ant-design/pro-components";
import { EditOutlined } from "@ant-design/icons";
import { The3DPrintSupplier } from "@/services/3dPrint/supplier.interface";
import { Button, Space, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { TDPrintPaths } from "../router";

const Supplier = () => {
  const table = useTablePage(getSupplier);
  const navigate = useNavigate();

  return (
    <BasePageContainer
      header={{
        extra: [
          <Button
            onClick={() => {
              navigate(TDPrintPaths.supplierHandle);
            }}
          >
            新增供应商
          </Button>,
        ],
      }}
    >
      <ListPage<The3DPrintSupplier>
        ghost
        cardProps={{
          ghost: true,
        }}
        grid={{ gutter: 8, column: 4 }}
        table={table}
        renderItem={(item: The3DPrintSupplier) => {
          const { name, nameEn, logo } = item;
          return (
            <ProCard
              className="m-1 w-auto"
              bordered
              title={
                <div>
                  <span>{name}</span>
                  {nameEn && (
                    <span className="inline-block ml-1">{nameEn}</span>
                  )}
                </div>
              }
              extra={[
                <Button
                  key="edit"
                  icon={<EditOutlined />}
                  onClick={() => {
                    navigate(TDPrintPaths.supplierHandle + "/" + item._id);
                  }}
                ></Button>,
              ]}
            >
              <Space size={[0, 8]} wrap>
                {item.filamentType?.map((i) => {
                  return <Tag key={i._id}>{i.name}</Tag>;
                })}
              </Space>
            </ProCard>
          );
        }}
      />
    </BasePageContainer>
  );
};

export default Supplier;
