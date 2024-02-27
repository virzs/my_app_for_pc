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
