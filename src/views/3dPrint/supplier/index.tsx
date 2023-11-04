import BasePageContainer from "@/components/containter/base";
import { getSupplier } from "@/services/3dPrint/supplier";
import ListPage from "@/components/ListPage/list";
import HandleModal from "./handle";
import { useTablePage } from "@/hooks/useTablePage";
import { ProCard } from "@ant-design/pro-components";
import { EditOutlined } from "@ant-design/icons";
import { The3DPrintSupplier } from "@/services/3dPrint/supplier.interface";
import { Button, Image } from "antd";
import { useState } from "react";

const Supplier = () => {
  const table = useTablePage(getSupplier);

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const { refresh } = table;

  return (
    <BasePageContainer>
      <HandleModal
        open={open}
        editId={editId}
        onFinished={() => {
          refresh();
        }}
        onClose={() => {
          setOpen(false);
          setEditId(undefined);
        }}
        onDetailLoading={(loading) => {
          setLoading(loading);
        }}
      />
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
                  loading={loading && editId === item._id}
                  key="edit"
                  icon={<EditOutlined />}
                  onClick={() => {
                    setOpen(true);
                    setEditId(item._id);
                  }}
                ></Button>,
              ]}
            >
              <Image className="w-4 bg-black" src={item.logo} />
            </ProCard>
          );
        }}
      />
    </BasePageContainer>
  );
};

export default Supplier;
