import { baseGetRequest, basePostRequest } from "@/utils/axios";
import { checkPath } from "@/utils/utils";

export interface Resource {
  _id: string;
  name: string;
  key: string;
  mimetype: string;
  dir: string;
  size: number;
  url: string;
}

export const resourceUpload = (dir: string, file: File) => {
  return basePostRequest(`/resource${checkPath(dir)}`, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })({ file });
};

/**
 * @name 获取单个资源下载链接
 */
export const resourceDownload = (id: string) => {
  return baseGetRequest(`/resource/${id}`)();
};

/**
 * @name 批量获取资源下载链接
 */
export const resourceDownloadBatch = (ids: string[]) => {
  return basePostRequest("/resource/urls")({ ids });
};
