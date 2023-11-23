import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { ConfigProvider, theme } from "antd";
import "./components/fontawesome/index";
import { Provider } from "react-redux";
import { store } from "./store";
import { ProConfigProvider } from "@ant-design/pro-components";
import Upload from "./components/ProFrom/upload";

function App() {
  const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        <ProConfigProvider
          valueTypeMap={{
            upload: {
              renderFormItem(text, props, dom) {
                return <Upload value={text} {...props} />;
              },
            },
          }}
        >
          <RouterProvider router={router} />
        </ProConfigProvider>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
