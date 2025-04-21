import {
  baseDeleteRequest,
  baseDetailRequest,
  baseGetRequest,
  basePostRequest,
  basePutRequest,
} from "@/utils/axios";

/**
 * 常见问题列表
 * /feedback/faq get
 */
export const getFaqList = (params: any) =>
  baseGetRequest("/feedback/faq")(params);

/**
 * 常见问题详情
 * /feedback/faq/:id get
 */
export const getFaqDetail = (id: string) =>
  baseDetailRequest("/feedback/faq")(id);

/**
 * 新增常见问题
 * /feedback/faq post
 */
export const addFaq = (data: any) => basePostRequest("/feedback/faq")(data);

/**
 * 编辑常见问题
 * /feedback/faq/:id put
 */
export const editFaq = (id: string, data: any) =>
  basePutRequest("/feedback/faq")(id, data);

/**
 * 删除常见问题
 * /feedback/faq/:id delete
 */
export const deleteFaq = (id: string) => baseDeleteRequest("/feedback/faq")(id);

/**
 * 公开或隐藏常见问题
 * /feedback/faq/public/:id put
 */
export const publicFaq = (id: string) =>
  basePutRequest("/feedback/faq/public")(id);

/**
 * 常见问题列表
 * /feedback/faq/list get
 */
export const getFaqListAll = () => baseGetRequest("/feedback/faq/list")();
