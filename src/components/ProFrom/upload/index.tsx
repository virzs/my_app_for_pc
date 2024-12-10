import { getToken } from "@/utils/token";
import { checkPath, getApiPrefix } from "@/utils/utils";
import { ProFieldFCRenderProps } from "@ant-design/pro-components";
import { UploadFile, Upload, Button } from "antd";
import { FC, useEffect, useState } from "react";
import { UploadChangeParam } from "antd/es/upload";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

export interface UploadProps extends ProFieldFCRenderProps {
  value?: any;
  /**
   * 是否显示为拖拽上传，实际使用时放在 fieldProps 里
   */
  dragger?: boolean;
  /**
   * 是否手动上传，实际使用时放在 fieldProps 里
   */
  manually?: boolean;
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
    listType = "picture",
    dragger = false,
    manually = false,
    ...rest
  } = fieldProps ?? {};

  const authorization = getToken() ?? "";

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (!value) {
      setFileList([]);
    } else {
      if (Array.isArray(value) && value.length !== 0) {
        setFileList(value);
      } else if (typeof value === "string") {
        setFileList([]);
      } else {
        setFileList([value]);
      }
    }
  }, [value]);

  // 向上层组件返回fileList
  const sendFileList = (nf: UploadFile[]) => {
    if (nf.length !== 0) {
      if (maxCount > 1 || maxCount === undefined) {
        fOnChange?.(nf.map((i: any) => i.response ?? i.originFileObj));
      } else {
        fOnChange?.(nf[0]?.response ?? nf[0]?.originFileObj);
      }
    }
  };

  const onChange = (info: UploadChangeParam<UploadFile>) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });
    setFileList(newFileList);
    if (info.file.status !== "uploading") {
      sendFileList(newFileList);
    }
  };

  const onRemove = (file: UploadFile) => {
    const newFileList = fileList.filter((f) => f.uid !== file.uid);
    setFileList(newFileList);
    sendFileList(newFileList);
  };

  const uploadProps = {
    action: getApiPrefix(`/resource${checkPath(dir)}`),
    headers: {
      authorization: `Bearer ${authorization}`,
    },
    fileList,
    maxCount,
    onChange,
    onRemove,
    listType,
    disabled,
    multiple,
    beforeUpload: (file: UploadFile) => {
      if (manually) {
        const newFileList = [...fileList, file];
        setFileList(newFileList);
        sendFileList(newFileList);
      }
      return !manually;
    },
    ...rest,
  };

  if (dragger) {
    return (
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">单击或将文件拖到此区域以上传</p>
        <p className="ant-upload-hint">支持单次或批量上传。</p>
      </Dragger>
    );
  }

  return (
    <Upload {...uploadProps}>
      {((maxCount && fileList?.length < maxCount) ||
        [null, undefined].includes(maxCount)) &&
        (listType === "picture-card" ? (
          <button style={{ border: 0, background: "none" }} type="button">
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>上传</div>
          </button>
        ) : (
          <Button disabled={disabled} icon={<UploadOutlined />}>
            上传
          </Button>
        ))}
    </Upload>
  );
};

export default MUpload;
