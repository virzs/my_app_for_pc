import {
  Block,
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
} from "@blocknote/core";
import { resourceUpload } from "@/services/resource";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { FC } from "react";
import { ProFieldFCRenderProps } from "@ant-design/pro-components";

export interface BlockNoteEditorProps extends ProFieldFCRenderProps {
  value?: Block<
    DefaultBlockSchema,
    DefaultInlineContentSchema,
    DefaultStyleSchema
  >[];
  onChange?: (
    value: Block<
      DefaultBlockSchema,
      DefaultInlineContentSchema,
      DefaultStyleSchema
    >[]
  ) => void;
}

const BlockNoteEditor: FC<BlockNoteEditorProps> = (props) => {
  const { value, onChange, fieldProps } = props;

  const { onChange: fOnChange, value: fValue } = fieldProps ?? {};

  const editor = useCreateBlockNote({
    initialContent: value ?? fValue,
    uploadFile(file) {
      return new Promise((resolve, reject) => {
        resourceUpload("blocknote", file)
          .then((res) => {
            resolve(res.url);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
  });

  return (
    <div className="border border-gray-200 border-solid p-2 rounded-lg h-96 overflow-y-auto">
      <BlockNoteView
        editor={editor}
        onChange={() => {
          onChange?.(editor.document);
          fOnChange?.(editor.document);
        }}
      />
    </div>
  );
};

export default BlockNoteEditor;
