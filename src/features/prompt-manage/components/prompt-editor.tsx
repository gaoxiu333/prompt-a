'use client';

import Editor, { Monaco } from '@monaco-editor/react';
import { MarkerSeverity, Range, Selection, type editor } from 'monaco-editor';

import { useCallback } from 'react';

import { useMonacoSetup } from '@/features/editor/useMonacoSetup';

export function PromptEditor() {
  const { monacoRef, handleEditorWillMount } = useMonacoSetup({
    errorFixFn: () => {},
  });

  function handleEditorChange(value, event) {
    // here is the current value
  }

  function handleEditorValidation(markers) {
    // model markers
    // markers.forEach(marker => console.log('onValidate:', marker.message));
  }
  const handleEditorDidMount = useCallback(
    (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
      monacoRef.current = monaco;
      // editorRef.current = editor;

      // if (autoFocus) {
      //   moveFocusAtEnd(editor);
      // }

      // registerActions(editor, monaco);
      // setIsEditorMounted(true);
    },
    [monacoRef],
  );
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-2xl font-bold">Prompt Editor</h1>
      <p className="mt-4 text-lg">Edit your prompts here.</p>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        theme="latitude"
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        beforeMount={handleEditorWillMount}
        onValidate={handleEditorValidation}
      />
    </div>
  );
}
