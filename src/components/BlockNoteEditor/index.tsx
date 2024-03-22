import {
  Block,
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
  BlockNoteEditor as BE,
} from "@blocknote/core";
import { resourceUpload } from "@/services/resource";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { FC, useMemo } from "react";
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

  const ie = useCreateBlockNote();

  const editor = useMemo(() => {
    if (!value && !fValue) return;
    return BE.create({
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
  }, [value, fValue]);

  return (
    <div className="border border-gray-200 border-solid p-2 rounded-lg h-96 overflow-y-auto">
      <BlockNoteView
        editor={editor ?? ie}
        onChange={() => {
          if (!editor) return;
          onChange?.(editor.document);
          fOnChange?.(editor.document);
        }}
      />
    </div>
  );
};

export default BlockNoteEditor;
