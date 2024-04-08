import {
  Block,
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
} from "@blocknote/core";
import { resourceUpload } from "@/services/resource";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { FC, useEffect, useState } from "react";
import { ProFieldFCRenderProps } from "@ant-design/pro-components";
import { cx } from "@emotion/css";

export interface BlockNoteEditorProps extends Partial<ProFieldFCRenderProps> {
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
  editable?: boolean;
  bordered?: boolean;
}

const BlockNoteEditor: FC<BlockNoteEditorProps> = (props) => {
  const {
    value,
    onChange,
    editable = true,
    bordered = true,
    fieldProps,
  } = props;

  const { onChange: fOnChange, value: fValue } = fieldProps ?? {};

  const [initialContent, setInitialContent] =
    useState<
      Block<
        DefaultBlockSchema,
        DefaultInlineContentSchema,
        DefaultStyleSchema
      >[]
    >();

  useEffect(() => {
    if (!value && !fValue) return;
    setInitialContent(value ?? fValue ?? []);
  }, [value, fValue]);

  const editor = useCreateBlockNote({
    initialContent: initialContent,
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
    <div
      className={cx(
        "overflow-y-auto",
        bordered
          ? "border border-gray-200 border-solid p-2 rounded-lg h-96"
          : ""
      )}
    >
      <BlockNoteView
        editor={editor}
        onChange={() => {
          if (!editor) return;
          onChange?.(editor.document);
          fOnChange?.(editor.document);
        }}
        editable={editable}
      />
    </div>
  );
};

export default BlockNoteEditor;
