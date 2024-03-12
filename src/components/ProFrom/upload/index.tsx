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
        // PS:不出意外的话上传会走到这里,但是下边已经处理了所以这里不做处理
      }
    }
    setFileList((pre: any) => ({ ...pre, ...item }));
  }, [value]);

  const onChange = (info: UploadChangeParam<UploadFile>) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }

      return file;
    });
    setFileList((pre: any) => ({
      ...pre,
      ...{
        [fieldProps.id]: newFileList,
      },
    }));
  };

  const onRemove = (file: UploadFile) => {
    const item: any = {};
    item[fieldProps.id] = fileList[fieldProps.id].filter(
      (f: any) => f.uid !== file.uid
    );
    setFileList((pre: any) => ({ ...pre, ...item }));
  };

  useEffect(() => {
    if (Object.keys(fileList).length !== 0) {
      const list = fileList[fieldProps.id];
      if (maxCount > 1) {
        fOnChange?.(list.map((i) => i.response));
      } else {
        fOnChange?.(list[0]?.response);
      }
    }
  }, [fileList, maxCount]);

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
    ...rest,
  };

  return (
    <Upload {...uploadProps}>
      {maxCount && fileList[fieldProps.id]?.length < maxCount && (
        <Button icon={<UploadOutlined />}>上传</Button>
      )}
    </Upload>
  );
};

export default MUpload;
