import { baseGetRequest, basePostRequest, basePutRequest } from "@/utils/axios";

// /users get
export const getUsers = (params: any) => baseGetRequest("/users")(params);

// /users post
export const postUsers = (data: any) => basePostRequest("/users")(data);

// /users/:id get
export const putUsers = (id: string, data: any) =>
  basePutRequest("/users")(id, data);

// 启用/禁用
// /users/status/{id} put
export const putEnable = (id: string, data?: any) =>
  basePutRequest("/users/enable")(id, data);

// /users/invitation-code get
export const getInvitationCode = (params: any) =>
  baseGetRequest("/users/invitation-code")(params);

// /users/invitation-code/forbidden ut
export const putForbidden = (id: string, data?: any) =>
  basePutRequest("/users/invitation-code/forbidden")(id, data);

// /users/invitation-code post
export const postInvitationCode = (data: any) =>
  basePostRequest("/users/invitation-code")(data);

// /users/statistics get
export const getUsersStatistics = () => baseGetRequest("/users/statistics")();

export interface UserRequestParams {
  keyWords: string;
}

/**
 * 搜索用户
 * /users/search get
 */
export const searchUsers = (params: UserRequestParams) =>
  baseGetRequest("/users/search")(params);
