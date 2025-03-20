import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder: string;
  onFocus: () => void
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder, onFocus }) => {
  const toolbarOptions = [
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ header: [1, 2, 3, 4, 5, false] }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
  ];

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={{ toolbar: toolbarOptions }}
      // style={{ height: "200px", backgroundColor: 'white' }}
      className="h-[300px] bg-[white] rounded-lg"
      placeholder={placeholder}
      onFocus={onFocus}
      
    />
  );
};

export default RichTextEditor;
