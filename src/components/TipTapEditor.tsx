import styles from "./TipTapEditor.module.css";

import { useEditor, EditorContent } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
  }),
  Highlight,
  Typography,
];

export const TiptapEditor = () => {
  const editor = useEditor({
    extensions,
    content: "<p>Start writing your document...</p>",
    editorProps: {
      attributes: {
        class: styles.tiptap,
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={styles.tiptapEditor}>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
