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
