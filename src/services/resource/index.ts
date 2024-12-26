import {
  baseDeleteRequest,
  baseGetRequest,
  basePostRequest,
  basePutRequest,
} from "@/utils/axios";
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
  return baseGetRequest(`/resource/url/${id}`)();
};

/**
 * @name 批量获取资源下载链接
 */
export const resourceDownloadBatch = (ids: string[]) => {
  return basePostRequest("/resource/urls")({ ids });
};

/**
 * @name 获取资源列表 R2
 */
export const resourceR2List = (params: any) => {
  return baseGetRequest("/resource/r2")(params);
};

/**
 * @name 删除资源
 */
export const resourceDelete = (id: string) => {
  return baseDeleteRequest(`/resource`)(id);
};

/**
 * @name 获取资源列表 Qiniu
 */
export const resourceQiniuList = (params: any) => {
  return baseGetRequest("/resource/qiniu")(params);
};

/**
 * @name 获取资源关联的所有数据
 * @description /resource/association/{id}
 */
export const resourceAssociation = (id: string) => {
  return baseGetRequest(`/resource/association/${id}`)();
};

/**
 * @name 获取资源详情
 */
export const resourceDetail = (id: string) => {
  return baseGetRequest(`/resource/objects/${id}`)();
};

/**
 * @name 批量上传
 */
export const resourceBatchUpload = (dir: string, files: File[]) => {
  return basePostRequest(`/resource/batch/${dir}`, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })({ files });
};

/**
 * @name 回收站列表
 * @description /resource/recycle
 */
export const resourceRecycleList = (params: any) => {
  return baseGetRequest("/resource/recycle")(params);
};

/**
 * @name 彻底删除资源
 * @description /resource/recycle/{id}
 */
export const resourceRecycleDelete = (id: string) => {
  return baseDeleteRequest("/resource/recycle")(id);
};

/**
 * @name 恢复资源
 * @description /resource/recycle/restore/{id}
 */
export const resourceRestore = (id: string) => {
  return basePutRequest("/resource/recycle/restore")(id);
};
