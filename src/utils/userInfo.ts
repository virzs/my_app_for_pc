export const getUserInfo = () => {
  return localStorage.getItem("userInfo");
};

export const setUserInfo = (userInfo: any) => {
  return localStorage.setItem("userInfo", JSON.stringify(userInfo));
};
