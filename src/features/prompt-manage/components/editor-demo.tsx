import Editor from '@monaco-editor/react';

const EditorDemo = () => {
  return (
    <div className="pt-7">
      <Editor
        height="80vh"
        defaultLanguage="document"
        defaultValue="// some code"
      />
    </div>
  );
};

export default EditorDemo;
