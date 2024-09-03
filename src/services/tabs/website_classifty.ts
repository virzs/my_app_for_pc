import {
  baseDeleteRequest,
  baseDetailRequest,
  baseGetRequest,
  basePostRequest,
  basePutRequest,
} from "@/utils/axios";

export interface WebsiteClassify {
  name: string;
  description?: string;
  icon?: string;
  enable: true;
  parent?: string;
}

// /tabs/website_classify get
export async function getWebsiteClassify(params: any) {
  return baseGetRequest("/tabs/website_classify")(params);
}

// /tabs/website_classify post
export async function addWebsiteClassify(data: WebsiteClassify) {
  return basePostRequest("/tabs/website_classify")(data);
}

// /tabs/website_classify/{id} put
export async function updateWebsiteClassify(id: string, data: WebsiteClassify) {
  return basePutRequest("/tabs/website_classify")(id, data);
}

// /tabs/website_classify/{id} delete
export async function delWebsiteClassify(id: string) {
  return baseDeleteRequest("/tabs/website_classify")(id);
}

// /tabs/website_classify/{id} detail
export async function getWebsiteClassifyDetail(id: string) {
  return baseDetailRequest("/tabs/website_classify")(id);
}

// /tabs/website_classify/tree get
export async function getWebsiteClassifyTree() {
  return baseGetRequest("/tabs/website_classify/tree")();
}
