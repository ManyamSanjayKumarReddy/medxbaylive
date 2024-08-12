import Quill from "quill";
import React, { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";

// Editor is an uncontrolled React component
const Editor = forwardRef(({ onTextChange = () => {}, onSelectionChange = () => {}, borderColor = "#ccc" }, ref) => {
  const containerRef = useRef(null);
  const onTextChangeRef = useRef(onTextChange);
  const onSelectionChangeRef = useRef(onSelectionChange);
  const [editor, setEditor] = useState(null);

  useLayoutEffect(() => {
    onTextChangeRef.current = onTextChange;
    onSelectionChangeRef.current = onSelectionChange;
  }, [onTextChange, onSelectionChange]);

  useEffect(() => {
    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );
    
    const quill = new Quill(editorContainer, {
      theme: "snow",
      modules: {
        toolbar: [
          [{ 'font': [] }, { 'size': [] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'script': 'sub' }, { 'script': 'super' }],
          [ 'blockquote'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
          [{ 'direction': 'rtl' },{ 'align': [] }],
          ['link', 'image'],
          ['clean'] 
        ]
      }
    });
    

    ref.current = quill;
    setEditor(quill);

    const handleTextChange = () => {
      if (typeof onTextChangeRef.current === 'function') {
        const editorContent = quill.root.innerHTML;
        onTextChangeRef.current(editorContent);
      }
    };

    quill.on('text-change', handleTextChange);
    quill.on('selection-change', (...args) => {
      if (typeof onSelectionChangeRef.current === 'function') {
        onSelectionChangeRef.current(...args);
      }
    });

    return () => {
      ref.current = null;
      container.innerHTML = "";
    };
  }, [ref]);

  return (
    <div 
      ref={containerRef} 
      className="editor-text-box" 
      style={{ borderColor }} // Apply border color if needed
    >
    </div>
  );
});

Editor.displayName = "Editor";

export default Editor;
