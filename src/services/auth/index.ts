import { basePostRequest } from "../../utils/axios";

// auth/refresh-token post
export const postRefreshToken = () => basePostRequest("/auth/refresh-token")();
