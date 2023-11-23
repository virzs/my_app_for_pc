import PageList from "@/components/ListPage/list";
import BasePageContainer from "@/components/containter/base";
import { useTablePage } from "@/hooks/useTablePage";
import { getFilament } from "@/services/3dPrint/filament";
import { ProCard } from "@ant-design/pro-components";
import { useState } from "react";
import FilamentHandle from "./handle";
import { Button, Popconfirm, Space, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Filament = () => {
  const table = useTablePage(getFilament);

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const { refresh } = table;

  return (
    <BasePageContainer>
      <FilamentHandle
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
      <PageList
        ghost
        cardProps={{
          ghost: true,
        }}
        grid={{ gutter: 8, column: 4 }}
        table={table}
        renderItem={(item: any) => {
          return (
            <ProCard
              title={item.type.name}
              subTitle={item.supplier.name}
              extra={[
                <Space size={[8, 0]} wrap>
                  <Button
                    loading={loading && editId === item._id}
                    key="edit"
                    icon={<EditOutlined />}
                    onClick={() => {
                      setOpen(true);
                      setEditId(item._id);
                    }}
                  ></Button>
                  <Popconfirm
                    title="确定删除？"
                    description="删除后不影响关联的历史数据"
                  >
                    <Button key="delete" icon={<DeleteOutlined />}></Button>
                  </Popconfirm>
                </Space>,
              ]}
            >
              <Space size={[0, 8]} wrap>
                {item.info?.map((i: any, j: any) => (
                  <Tag key={j} color={i.color}>
                    {i.color}
                  </Tag>
                ))}
              </Space>
            </ProCard>
          );
        }}
      />
    </BasePageContainer>
  );
};

export default Filament;
