import {
  baseGetRequest,
  basePostRequest,
  basePutRequest,
  baseDeleteRequest,
  baseDetailRequest,
} from "@/utils/axios";

export interface FeedbackTypeRequestData {
  /**
   * 类型
   */
  type: string;
  /**
   * 描述
   */
  description: string;
  /**
   * 是否启用
   */
  enable: boolean;
  /**
   * 处理人
   */
  handler: string;
}

/**
 * 反馈类型分页
 * /feedback/type get
 */
export const getTypeList = (params: any) =>
  baseGetRequest("/feedback/type")(params);

/**
 * 反馈类型详情
 * /feedback/type/:id get
 */
export const getTypeDetail = (id: string) =>
  baseDetailRequest("/feedback/type")(id);

/**
 * 新增反馈类型
 * /feedback/type post
 */
export const addType = (data: any) => basePostRequest("/feedback/type")(data);

/**
 * 编辑反馈类型
 * /feedback/type/:id put
 */
export const editType = (id: string, data: any) =>
  basePutRequest("/feedback/type")(id, data);

/**
 * 删除反馈类型
 * /feedback/type/:id delete
 */
export const deleteType = (id: string) =>
  baseDeleteRequest("/feedback/type")(id);

/**
 * 反馈类型列表
 * /feedback/type/list get
 */
export const getTypeListAll = () => baseGetRequest("/feedback/type/list")();
