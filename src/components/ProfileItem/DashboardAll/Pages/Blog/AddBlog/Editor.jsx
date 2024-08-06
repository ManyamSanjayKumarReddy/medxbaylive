import Quill from "quill";
import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";

// Editor is an uncontrolled React component
const Editor = forwardRef(({ onTextChange, onSelectionChange }, ref) => {
  const containerRef = useRef(null);
  const onTextChangeRef = useRef(onTextChange);
  const onSelectionChangeRef = useRef(onSelectionChange);

  useLayoutEffect(() => {
    onTextChangeRef.current = onTextChange;
    onSelectionChangeRef.current = onSelectionChange;
  });

  useEffect(() => {
    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );
    const quill = new Quill(editorContainer, {
      theme: "snow",
    });

    ref.current = quill;

    quill.on(Quill.events.TEXT_CHANGE, (...args) => {
      onTextChangeRef.current?.(...args);
      const [delta, oldDelta, source] = args;
      const editorContent = quill.root.innerHTML;
      onTextChange(editorContent);
    });

    quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
      onSelectionChangeRef.current?.(...args);
    });

    return () => {
      ref.current = null;
      container.innerHTML = "";
    };
  }, [ref]);

  return <div ref={containerRef} className="text-editor"></div>;
});

Editor.displayName = "Editor";

export default Editor;
