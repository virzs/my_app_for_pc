import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { ConfigProvider, theme } from "antd";
import { Provider } from "react-redux";
import { store } from "./store";
import { ProConfigProvider } from "@ant-design/pro-components";
import Upload from "./components/ProFrom/upload";
import Tree from "./components/ProFrom/Tree";
import { MdEditor } from "zs_library";
import "zs_library/style.css";

function App() {
  const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: darkMode ? "rgb(237, 237, 237)" : "rgba(23, 23, 23)",
          },
          components: {
            Select: {
              optionSelectedColor: darkMode
                ? "rgba(12, 4, 4)"
                : "rgb(237, 237, 237)",
            },
            Table: {
              rowSelectedBg: darkMode ? "rgba(12, 4, 4)" : "rgb(237, 237, 237)",
              rowSelectedHoverBg: darkMode
                ? "rgba(12, 4, 4)"
                : "rgb(237, 237, 237)",
            },
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
                const { readonly, placeholder, fieldProps, ...rest } = props;
                return (
                  <MdEditor
                    value={text}
                    readOnly={readonly}
                    placeholder={placeholder as string | undefined}
                    {...rest}
                    {...fieldProps}
                  />
                );
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
