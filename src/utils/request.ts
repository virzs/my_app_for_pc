import { extend, ResponseError } from "umi-request";
import { notification } from "antd";
import {
  getAccessToken,
  getRefreshToken,
  handleLogout,
  history,
  jwtDecode,
  RenderError,
  setAccessToken,
  setRefreshToken,
} from ".";
import { accountRefreshToken } from "@/services/account";

// token 刷新提前秒数
export const refreshTokenBefore = 600;
// token 前缀
export const authorizationPrefix = "jwt ";

const codeMessage: {
  [code: number]: string;
} = {
  200: "更新/获取资源成功",
  201: "创建资源成功",
  204: "删除资源成功",
  401: "认证失败",
  403: "没有权限",
  404: "资源不存在",
  429: "请求超过了限速，请稍后再试",
  500: "服务器发生了错误",
  502: "服务器暂不可用",
  503: "服务器暂不可用",
  504: "服务器连接超时",
};

/**
 * 异常处理
 * @param error 异常响应
 */
const errorHandler = (error: {
  response: Response;
  data: any;
}): Promise<ResponseError> => {
  const { response, data } = error;
  if (response && response.status) {
    if (data && !(typeof data === "string" && data.includes("<html"))) {
      RenderError(data);
    } else {
      const errorText = codeMessage[response.status] || response.statusText;
      notification.error({
        key: "error",
        message: `请求错误 ${response.status}`,
        description: errorText,
      });
    }
    if (response.status === 401) {
      /* setTimeout(() => {
        handleLogout();
      }, 1000); */
      handleLogout();
    } /* else if (response.status === 404) {
      history.push({
        pathname: "/d404",
      });
    } */
  } else if (!response) {
    notification.error({
      key: "error",
      description: "您的网络发生异常，无法连接服务器",
      message: "网络异常",
    });
  }

  return Promise.reject(error);
};

const request = extend({
  prefix: "/api/v1",
  errorHandler,
  credentials: "include", // 默认请求是否带上cookie
});

request.interceptors.request.use((url, options) => {
  options.headers = {
    ...options.headers,
    Authorization: getAccessToken()
      ? `${authorizationPrefix}${getAccessToken()}`
      : "",
  };

  return {
    url,
    options,
    interceptors: true,
  };
});

request.use(async (ctx, next) => {
  if (ctx.req.url.includes("account/refresh-token")) {
    // 请求为刷新 Token, 跳过此次拦截
    return next();
  }
  const accessToken = getAccessToken();
  if (accessToken) {
    const accessTokenDecode = jwtDecode(accessToken);
    const timestarp = Math.ceil(new Date().getTime() / 1000);
    console.log(
      "TOKEN_REST",
      (accessTokenDecode.exp ?? 0) - timestarp - refreshTokenBefore
    );
    if (
      accessTokenDecode.exp &&
      accessTokenDecode.exp - timestarp - refreshTokenBefore <= 0
    ) {
      // Access token 有效且已过期
      const refreshToken = getRefreshToken();
      const refreshTokenDecode = jwtDecode(refreshToken);
      if (refreshTokenDecode.exp && refreshTokenDecode.exp - timestarp > 0) {
        // Refresh token 有效且未过期
        // 请求刷新 Token 接口

        // 请求刷新 Token 接口
        try {
          const refreshRes = await accountRefreshToken({
            refresh_token: refreshToken,
            uid: refreshTokenDecode.uid,
          });

          if (refreshRes.access_token) {
            // 刷新结果符合预期，保存新的 Token，并更新此次请求的 Token 以保证请求继续并成功
            setAccessToken(refreshRes.access_token);
            if (refreshRes.refresh_token) {
              setRefreshToken(refreshRes.refresh_token);
            }
            ctx.req.options.headers = {
              ...ctx.req.options.headers,
              Authorization: `${authorizationPrefix}${refreshRes.access_token}`,
            };
            return next();
          }
        } catch (error) {
          handleLogout();
          return;
        }

        // Refresh token 无效或已过期，执行注销退出
        handleLogout();
        return;
      }
    }
  }

  return next();
});

export default request;
