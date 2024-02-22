import { basePostRequest } from "@/utils/axios";
import { checkPath } from "@/utils/utils";

export const resourceUpload = (dir: string, file: File) => {
  return basePostRequest(`/resource${checkPath(dir)}`, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })({ file });
};
