import {
  baseDeleteRequest,
  baseDetailRequest,
  baseGetRequest,
  basePostRequest,
  basePutRequest,
} from "@/utils/axios";

export interface RoleRequest {
  _id: string;
  name: string;
  description: string;
  permissions: string[];
}

//   /system/role/list get
export async function getRoleList(params: any): Promise<RoleRequest[]> {
  return baseGetRequest("/system/role/list")(params);
}
