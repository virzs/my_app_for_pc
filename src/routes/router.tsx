import { createBrowserRouter } from "react-router-dom";
import LoginRouter from "../views/login/router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Welcome to Tauri!</h1>,
  },
  LoginRouter,
]);

export default router;
