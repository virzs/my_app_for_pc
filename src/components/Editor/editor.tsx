import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import Checklist from "@editorjs/checklist";
import Quote from "@editorjs/quote";
import Paragraph from "@editorjs/paragraph";
import CodeTool from "@editorjs/code";
import AttachesTool from "@editorjs/attaches";
import Warning from "@editorjs/warning";
import InlineCode from "@editorjs/inline-code";
import Table from "@editorjs/table";
import Marker from "@editorjs/marker";
import RawTool from "@editorjs/raw";
import Delimiter from "@editorjs/delimiter";
import TextVariantTune from "@editorjs/text-variant-tune";
import Underline from "@editorjs/underline";
import NestedList from "@editorjs/nested-list";
import DragDrop from "editorjs-drag-drop";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { css, cx } from "@emotion/css";
import { ProFieldFCRenderProps } from "@ant-design/pro-components";

export interface EditorProps extends Partial<ProFieldFCRenderProps> {
  value: OutputData;
  onChange?: (data: OutputData) => void;
  bordered?: boolean;
  readOnly?: boolean;
}

const Editor: FC<EditorProps> = (props) => {
  const {
    value,
    onChange,
    fieldProps,
    bordered = true,
    readOnly = true,
  } = props;

  const { onChange: fOnChange, value: fValue } = fieldProps ?? {};

  const isReady = useRef(false);
  const [saving, setSaving] = useState(false);
  const [init, setInit] = useState(false);

  const editor = useMemo(() => {
    return new EditorJS({
      placeholder: "输入/来浏览选项",
      holder: "editor",
      readOnly: readOnly,
      tools: {
        // https://github.com/editor-js/attaches
        attaches: {
          class: AttachesTool,
          config: {
            // 可选的文件上传端点或使用上传器
            endpoint: "http://localhost:8008/uploadFile",
            // uploader 可选的自定义上传方法或使用端点
            // field (默认值:file) POST请求中上传文件字段的名称
            // types (默认值:*)文件选择可以接受的文件类型。
            buttonText: "选择文件", // (默认:选择文件)文件上传按钮的占位符
            // errorMessage (默认值:File upload failed)显示文件上传失败的消息
            // additionalRequestHeaders (default:{})对象，该对象具有任何将添加到请求中的自定义头。示例:{"X-CSRF-TOKEN": "W5fe2…hR8d1"}
          },
        },
        // https://github.com/editor-js/image
        image: {
          class: ImageTool,
          config: {
            // 上传文件的端点。包含2个字段:byFile -用于上传文件 byUrl -按URL上传
            endpoints: {
              byFile: "http://localhost:8008/uploadFile",
              byUrl: "http://localhost:8008/fetchUrl",
            },
            // field (默认:image) POST请求中上传图片字段的名称
            // types (默认值:image/*) mime -文件选择可以接受的文件类型。
            // additionalRequestData 对象，其中包含要随上传请求发送的任何数据
            // additionalRequestHeaders 对象的任何自定义头将添加到请求。
            // captionPlaceholder (默认:Caption)标题输入的占位符
            // buttonContent 允许覆盖«选择文件»按钮的HTML内容
            // uploader 可选的自定义上传方式。
            // actions 数组，其中包含要显示在工具设置菜单中的自定义操作。
          },
        },
        warning: {
          class: Warning,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+W",
          config: {
            titlePlaceholder: "标题",
            messagePlaceholder: "信息",
          },
        },
        list: {
          class: NestedList,
          inlineToolbar: true,
          config: {
            // 默认列表样式:有序或无序，默认为无序
            defaultStyle: "unordered",
          },
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
          // placeholder 占位符。当整个编辑器为空时，将只显示在第一段。
          // preserveBlank (默认值:false)保存编辑器数据时是否保留空白段落
        },
        code: {
          class: CodeTool,
          // placeholder 代码工具的占位符字符串
        },
        header: {
          class: Header,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+H",
          config: {
            placeholder: "输入标题",
            // levels
            // defaultLevel
          },
        },
        inlineCode: {
          class: InlineCode,
          shortcut: "CMD+SHIFT+M",
        },
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2, // 初始行数。默认为2
            cols: 3, // 初始列数。默认为2
            // withHeadings 切换表格标题。默认为False
          },
        },
        Marker: {
          class: Marker,
          shortcut: "CMD+SHIFT+M",
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+O",
          config: {
            quotePlaceholder: "输入引用",
            captionPlaceholder: "引用的作者",
          },
        },
        raw: {
          class: RawTool,
          // placeholder 占位符。
        },
        delimiter: Delimiter,
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        textVariant: TextVariantTune,
        underline: Underline,
      },
      // tunes: ["textVariant"],
      /**
       * Internationalzation config
       */
      i18n: {
        /**
         * @type {I18nDictionary}
         */
        messages: {
          /**
           * Other below: translation of different UI components of the editor.js core
           */
          ui: {
            blockTunes: {
              toggler: {
                "Click to tune": "单击以调整",
                "or drag to move": "或拖动以移动",
              },
            },
            inlineToolbar: {
              converter: {
                "Convert to": "转换为",
              },
            },
            toolbar: {
              toolbox: {
                Add: "添加",
              },
            },
          },

          /**
           * Section for translation Tool Names: both block and inline tools
           */
          toolNames: {
            Text: "文本",
            Heading: "标题",
            List: "嵌套列表",
            Warning: "警告",
            Checklist: "列表选择",
            Quote: "引用",
            Code: "代码",
            Delimiter: "分隔符",
            "Raw HTML": "原始HTML",
            Table: "表格",
            Link: "链接",
            Marker: "标记",
            Bold: "粗体",
            Italic: "斜体",
            InlineCode: "行内代码",
            Image: "图片",
            Attachment: "附件",
            Underline: "下划线",
          },

          /**
           * Section for passing translations to the external tools classes
           */
          tools: {
            /**
             * Each subsection is the i18n dictionary that will be passed to the corresponded plugin
             * The name of a plugin should be equal the name you specify in the 'tool' section for that plugin
             */
            warning: {
              // <-- 'Warning' tool will accept this dictionary section
              Title: "标题",
              Message: "信息",
            },

            /**
             * Link is the internal Inline Tool
             */
            link: {
              "Add a link": "添加链接",
            },
            /**
             * The "stub" is an internal block tool, used to fit blocks that does not have the corresponded plugin
             */
            stub: {
              "The block can not be displayed correctly.": "该块不能正确显示。",
            },
            header: {
              "Heading 1": "标题1",
              "Heading 2": "标题2",
              "Heading 3": "标题3",
              "Heading 4": "标题4",
              "Heading 5": "标题5",
              "Heading 6": "标题6",
            },
            textVariant: {
              "Call-out": "标注",
            },
          },

          /**
           * Section allows to translate Block Tunes
           */
          blockTunes: {
            /**
             * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
             * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
             *
             * Also, there are few internal block tunes: "delete", "moveUp" and "moveDown"
             */
            delete: {
              Delete: "删除",
              "Click to delete": "单击以删除",
            },
            moveUp: {
              "Move up": "向上移动",
            },
            moveDown: {
              "Move down": "向下移动",
            },
            callOut: {
              "Call-out": "标注",
            },
          },
        },
      },
      onReady: () => {
        new DragDrop(editor);
        isReady.current = true;
        console.log("Editor.js is ready to work!");
      },
      onChange: (api, event) => {
        setSaving(true);
      },
    });
  }, []);

  useEffect(() => {
    if (editor.render && !init && (value || fValue)) {
      editor.render(value ?? fValue);
      setInit(true);
    }
  }, [value, fValue, editor.render, init]);

  useEffect(() => {
    if (saving && editor?.save) {
      editor.save().then((outputData) => {
        onChange?.(outputData);
        fOnChange?.(outputData);
        setSaving(false);
      });
    }
  }, [saving, editor]);

  return (
    <div
      id="editor"
      className={cx(
        "px-8 py-6",
        bordered ? "border border-solid rounded-md" : "",
        bordered
          ? css`
              border-color: rgba(5, 5, 5, 0.06);
            `
          : "",
        css`
          .ce-popover__items {
            display: flex;
            flex-direction: column;

            .ce-popover-item {
              &[data-item-name="delete"] {
                transition: 0.3s;
                /* 删除按钮 */
                color: red;
                order: 9999;
                &:not(.ce-popover-item--confirmation) {
                  background-color: rgba(255, 0, 0, 0.08);
                }
              }
            }
          }
        `
      )}
    ></div>
  );
};

export default Editor;
