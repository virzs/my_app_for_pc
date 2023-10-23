import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/token";
import { useEffect } from "react";
import { notification } from "antd";
import { AuthPaths } from "../auth/router";
import { getUserInfo } from "../../utils/userInfo";

const HomeView = () => {
  const navigate = useNavigate();
  const userInfo = getUserInfo();

  const checkIsLogin = () => {
    const token = getToken();
    if (!token) {
      notification.error({
        message: "You are not logged in",
        description: "Please login to continue",
      });
      navigate(AuthPaths.login);
    }
  };

  useEffect(() => {
    checkIsLogin();
  }, []);

  return <div>{userInfo}</div>;
};

export default HomeView;