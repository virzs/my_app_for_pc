import {
  baseGetRequest,
  basePostRequest,
  basePutRequest,
  baseDeleteRequest,
  baseDetailRequest,
} from "@/utils/axios";

// /my-site/blog
export async function getBlogList(params: any) {
  return baseGetRequest("/my-site/blog")(params);
}

// /my-site/blog post
export async function addBlog(data: any) {
  return basePostRequest("/my-site/blog")(data);
}

// /my-site/blog/:id put
export async function updateBlog(id: string, data: any) {
  return basePutRequest("/my-site/blog")(id, data);
}

// /my-site/blog/:id delete
export async function deleteBlog(id: string) {
  return baseDeleteRequest("/my-site/blog")(id);
}

// /my-site/blog/:id get
export async function getBlogDetail(id: string) {
  return baseDetailRequest("/my-site/blog")(id);
}

// /my-site/blog/publish put
export async function publishBlog(id: any) {
  return basePutRequest("/my-site/blog/publish")(id, {});
}
