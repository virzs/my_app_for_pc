import { createBrowserRouter } from "react-router-dom";
import HomeRouter from "../views/home/router";
import AuthRouter from "../views/auth/router";

const router = createBrowserRouter([HomeRouter, AuthRouter]);

export default router;
