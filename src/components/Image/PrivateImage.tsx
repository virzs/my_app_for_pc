import { Resource, resourceDownload } from "@/services/resource";
import { useRequest, useSessionStorageState } from "ahooks";
import { Image, ImageProps } from "antd";
import { FC, useEffect, useState } from "react";

export interface PrivateImageProps
  extends Omit<ImageProps, "src" | "resource"> {
  resource?: Resource;
}

/**
 * @name 从对象存储下载私有资源
 * @param props
 * @returns
 */
const PrivateImage: FC<PrivateImageProps> = (props) => {
  const { resource, ...rest } = props;

  const [isRemoved, setIsRemoved] = useState<boolean>(false);

  const { data, run } = useRequest(resourceDownload, {
    manual: true,
    onError: () => {
      // 报错代表资源不存在，设置为已删除
      setIsRemoved(true);
    },
  });

  // 从 sessionStorage 中获取 url，节约请求
  const [url, setUrl] = useSessionStorageState<string | undefined>(
    resource?._id ?? ""
  );

  useEffect(() => {
    if (data) {
      setUrl(data);
    }
  }, [data]);

  return (
    <Image
      src={url ?? data ?? resource?.url}
      onError={() => {
        if (resource && !isRemoved) {
          setUrl(undefined);
          run(resource._id);
        }
      }}
      {...rest}
    />
  );
};

export default PrivateImage;
