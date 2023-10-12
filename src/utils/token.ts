export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token: string) => {
  return localStorage.setItem("token", token);
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const setRefreshToken = (refreshToken: string) => {
  return localStorage.setItem("refreshToken", refreshToken);
};
