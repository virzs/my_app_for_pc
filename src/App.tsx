import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { ConfigProvider, theme } from "antd";
import "./components/fontawesome/index";

function App() {
  const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
