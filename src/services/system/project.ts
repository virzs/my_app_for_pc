import { baseGetRequest, basePostRequest, basePutRequest } from "@/utils/axios";

export interface ProjectData {
  name: string;
  description?: string;
  forceInvitationCode: boolean;
}

// detail
// /system/project
export async function getProject(params: any) {
  return baseGetRequest("/system/project")(params);
}

// post
// /system/project
export async function addProject(data: ProjectData) {
  return basePostRequest("/system/project")(data);
}

// put
// /system/project/{id}
export async function updateProject(id: string, data: ProjectData) {
  return basePutRequest("/system/project")(id, data);
}
