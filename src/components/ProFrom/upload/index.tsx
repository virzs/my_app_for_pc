import { getToken } from "@/utils/token";
import { checkPath, getApiPrefix } from "@/utils/utils";
import { ProFieldFCRenderProps } from "@ant-design/pro-components";
import { UploadFile, Upload, Button } from "antd";
import { FC, useEffect, useState } from "react";
import { UploadChangeParam } from "antd/es/upload";
import { UploadOutlined } from "@ant-design/icons";

export interface UploadProps extends ProFieldFCRenderProps {
  value?: any;
}

const MUpload: FC<UploadProps> = (props) => {
  const { value, fieldProps } = props;
  const {
    dir = "default",
    onChange: fOnChange,
    value: fValue,
    multiple = false,
    maxCount,
    disabled,
    ...rest
  } = fieldProps ?? {};

  const authorization = getToken() ?? "";

  const [fileList, setFileList] = useState<Record<string, UploadFile[]>>({});

  useEffect(() => {
    const item: any = {};
    if (!value) {
      item[props.fieldProps.id] = [];
    } else {
      if (Array.isArray(value) && value.length !== 0) {
        item[props.fieldProps.id] = value;
      } else if (typeof value === "string") {
        item[props.fieldProps.id] = [];
      } else {
        item[props.fieldProps.id] = [value];
      }
    }
    setFileList((pre: any) => ({ ...pre, ...item }));
  }, [value]);

  // 向上层组件返回fileList
  const sendFileList = (nf: any) => {
    if (Object.keys(nf).length !== 0) {
      const list = nf[fieldProps.id];
      if (maxCount > 1) {
        fOnChange?.(list.map((i: any) => i.response));
      } else {
        fOnChange?.(list[0]?.response);
      }
    }
  };

  const onChange = (info: UploadChangeParam<UploadFile>) => {
    console.log(info);
    let newFileList = [...info.fileList];
    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }

      return file;
    });
    const nf: Record<string, UploadFile[]> = {
      ...fileList,
      [fieldProps.id]: newFileList,
    };
    setFileList(nf);
    if (info.file.status !== "uploading") {
      sendFileList(nf);
    }
  };

  const onRemove = (file: UploadFile) => {
    const item: any = {};
    item[fieldProps.id] = fileList[fieldProps.id].filter(
      (f: any) => f.uid !== file.uid
    );
    const nf = { ...fileList, ...item };
    setFileList(nf);
    sendFileList(nf);
  };

  const uploadProps = {
    action: getApiPrefix(`/resource${checkPath(dir)}`),
    headers: {
      authorization: `Bearer ${authorization}`,
    },
    fileList: fileList[fieldProps.id] ?? [],
    maxCount,
    onChange,
    onRemove,
    listType: "picture",
    disabled,
    ...rest,
  };

  return (
    <Upload {...uploadProps}>
      {((maxCount && fileList[fieldProps.id]?.length < maxCount) ||
        [null, undefined].includes(maxCount)) && (
        <Button disabled={disabled} icon={<UploadOutlined />}>
          上传
        </Button>
      )}
    </Upload>
  );
};

export default MUpload;
