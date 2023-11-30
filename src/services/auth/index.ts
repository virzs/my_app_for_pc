import { basePostRequest } from "../../utils/axios";
import { LoginRequest, LoginResponse } from "./interface";

interface RefreshTokenRequestData {
  refreshToken: string;
}

// auth/refresh-token post
export const postRefreshToken = (data: RefreshTokenRequestData) =>
  basePostRequest("/auth/refresh-token")(data);

// /auth/login post
export const postLogin = (data: LoginRequest): Promise<LoginResponse> =>
  basePostRequest("/auth/login")(data);
