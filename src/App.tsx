import { Watermark } from "antd";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";

function App() {
  return (
    <Watermark
      // content="my_app_for_pc"
      font={{
        color: "#fff",
      }}
    >
      <RouterProvider router={router} />
    </Watermark>
  );
}

export default App;
