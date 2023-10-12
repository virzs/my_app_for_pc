import { basePostRequest } from "../../utils/axios";
import { LoginRequest, LoginResponse } from "./interface";

// auth/refresh-token post
export const postRefreshToken = () => basePostRequest("/auth/refresh-token")();

// /auth/login post
export const postLogin = (data: LoginRequest): Promise<LoginResponse> =>
  basePostRequest("/auth/login")(data);
