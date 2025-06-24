import styles from "./TipTapEditor.module.css";

import { useEditor, EditorContent } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import StarterKit from "@tiptap/starter-kit";
import React, { useState } from "react";
import FormattingToolbar from "./FormattingToolbar";
import { htmlToMarkdown, downloadMarkdown } from "../utils/markdownConverter";
import { downloadAsDocx } from "../utils/docxConverter";
import { downloadAsPdf } from "../utils/pdfConverter";
import { SaveFormat, SaveModal } from "./SaveButton";

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
  const [showSaveModal, setShowSaveModal] = useState(false);

  const editor = useEditor({
    extensions,
    content: "",
    editorProps: {
      attributes: {
        class: styles.tiptap,
      },
    },
  });

  if (!editor) {
    return null;
  }

  const handleSave = async (format: SaveFormat, customFilename: string) => {
    if (!editor) return;

    const html = editor.getHTML();

    try {
      if (format === "docx") {
        const filename = `${customFilename}.docx`;
        await downloadAsDocx(html, filename);
      } else if (format === "pdf") {
        const filename = `${customFilename}.pdf`;
        await downloadAsPdf(html, filename);
      } else {
        // Default to markdown
        const markdown = htmlToMarkdown(html);
        const filename = `${customFilename}.md`;
        downloadMarkdown(markdown, filename);
      }
    } catch (error) {
      console.error("Error saving document:", error);
      // You could add a toast notification here to inform the user
      alert("Error saving document: " + (error as Error).message);
    }
  };

  const handleSaveClick = () => {
    setShowSaveModal(true);
  };

  return (
    <div className={styles.editorWrapper}>
      <FormattingToolbar 
        editor={editor} 
        onSave={handleSaveClick}
        disabled={!editor}
      />
      
      <div className={styles.tiptapEditor}>
        <EditorContent editor={editor} />
      </div>
      
      <SaveModal 
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default TiptapEditor;
