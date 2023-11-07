import BasePageContainer from "@/components/containter/base";
import { getFilamentType } from "@/services/3dPrint/filamentType";
import { useRequest } from "ahooks";
import FilamentTypeHandle from "./handle";
import { useState } from "react";
import { ProCard } from "@ant-design/pro-components";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

const FilamentType = () => {
  const { data = [], loading: listLoading, run } = useRequest(getFilamentType);

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  return (
    <BasePageContainer loading={listLoading}>
      <FilamentTypeHandle
        open={open}
        editId={editId}
        onFinished={() => {
          run();
        }}
        onClose={() => {
          setOpen(false);
          setEditId(undefined);
        }}
        onDetailLoading={(loading) => {
          setLoading(loading);
        }}
      />
      {data?.map((i, j) => {
        return (
          <ProCard
            key={j}
            title={i.name}
            content={i.description}
            extra={
              <Button
                loading={loading && editId === i._id}
                key="edit"
                icon={<EditOutlined />}
                onClick={() => {
                  setOpen(true);
                  setEditId(i._id);
                }}
              ></Button>
            }
          ></ProCard>
        );
      })}
    </BasePageContainer>
  );
};

export default FilamentType;
