import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { ConfigProvider, theme } from "antd";
import "./components/fontawesome/index";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  );
}

export default App;
