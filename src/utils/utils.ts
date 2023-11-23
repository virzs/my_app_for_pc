import { FormLayout } from "antd/lib/form/Form";

export const getApiPrefix = (
  path: string,
  extra?: number | string | Array<number | string>
) => {
  const prefix = "/api";

  const mergedExtra = Array.isArray(extra)
    ? extra
    : extra || extra === 0
    ? [extra]
    : [];
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }
  if (!path.endsWith("/")) {
    path = `${path}/`;
  }
  if (mergedExtra?.length) {
    path += mergedExtra.map((item) => `${item}/`).join("");
  }
  path = `${prefix}${path}`;
  return path;
};

// 默认表单布局
export const baseFormItemLayout: {
  [x: string]: any;
  layout: FormLayout;
} = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
  layout: "horizontal",
};

// 检查 path 开头是否包含 / 如果没有则添加
export const checkPath = (path: string) => {
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }
  return path;
};
