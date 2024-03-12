import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { ConfigProvider, theme } from "antd";
import "./components/fontawesome/index";
import { Provider } from "react-redux";
import { store } from "./store";
import { ProConfigProvider } from "@ant-design/pro-components";
import Upload from "./components/ProFrom/upload";
import BlockNoteEditor from "./components/BlockNoteEditor";
import Tree from "./components/ProFrom/Tree";

function App() {
  const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: darkMode ? "rgb(237, 237, 237)" : "rgb(23, 23, 23)",
          },
        }}
      >
        <ProConfigProvider
          valueTypeMap={{
            upload: {
              renderFormItem(text, props) {
                return <Upload value={text} {...props} />;
              },
            },
            editor: {
              renderFormItem(text, props) {
                return <BlockNoteEditor value={text} {...props} />;
              },
            },
            tree: {
              renderFormItem(text, props: any) {
                return <Tree value={text} {...props} />;
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
