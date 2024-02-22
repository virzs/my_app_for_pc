import {
  Block,
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
} from "@blocknote/core";
import { resourceUpload } from "@/services/resource";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { FC } from "react";

export interface BlockNoteEditorProps {
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
  const { value, onChange } = props;

  const editor = useBlockNote({
    initialContent: value,
    onEditorContentChange(editor) {
      onChange?.(editor.topLevelBlocks);
    },
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
    <div className="border border-gray-200 border-solid p-2 rounded-lg">
      <BlockNoteView editor={editor} />
    </div>
  );
};

export default BlockNoteEditor;
