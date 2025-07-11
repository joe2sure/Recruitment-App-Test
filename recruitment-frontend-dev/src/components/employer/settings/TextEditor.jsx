import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { 
  FiBold, 
  FiItalic, 
  FiLink 
} from "react-icons/fi";
import { 
  FaSmile, 
  FaListOl, 
  FaListUl 
} from "react-icons/fa";

const TiptapEditor = ({ content, onChange, maxLength = 500 }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline',
        },
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      if (text.length <= maxLength) {
        onChange(text);
      }
    },
    editorProps: {
      attributes: {
        class: 'border border-[#D6C3E9] p-3 min-h-[120px] bg-white focus:outline-none',
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getText()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const addLink = () => {
    const url = prompt("Enter URL:");
    if (url && editor) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  const addEmoji = () => {
    const emoji = prompt("Enter emoji:");
    if (emoji && editor) {
      editor.chain().focus().insertContent(emoji).run();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div>
     
      <EditorContent editor={editor} />
       <div className="flex space-x-2 mb-1 border border-t-0 border-[#D6C3E9] p-3 text-[#7C8493]">
        <button type="button" onClick={addEmoji} className="p-1">
          <FaSmile />
        </button>
        <button 
          type="button" 
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
        >
          <FiBold />
        </button>
        <button 
          type="button" 
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
        >
          <FiItalic />
        </button>
        
        
        <button 
          type="button" 
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
        >
          <FaListOl />
        </button>
        <button 
          type="button" 
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
        >
          <FaListUl />
        </button>
        <button 
          type="button" 
          onClick={addLink}
          className={`p-1 ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
        >
          <FiLink />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <h4 className="text-[#A8ADB7]">
Maximum 500 characters
        </h4>
        <section className=" text-[#515B6F]">
        {editor.getText().length} / {maxLength}
      </section>
      </div>
    </div>
  );
};

export default TiptapEditor;