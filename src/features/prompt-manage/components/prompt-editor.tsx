'use client';

import Editor, { Monaco } from '@monaco-editor/react';
import { MarkerSeverity, Range, Selection, type editor } from 'monaco-editor';

import { useCallback } from 'react';

import { useMonacoSetup } from '@/features/editor/useMonacoSetup';

const options = {
  fixedOverflowWidgets: true,
  lineDecorationsWidth: 0,
  padding: {
    top: 16,
    bottom: 16,
  },
  lineNumbers: 'on',
  lineNumbersMinChars: 3,
  minimap: {
    enabled: false,
  },
  copyWithSyntaxHighlighting: false,
  cursorSmoothCaretAnimation: 'on',
  occurrencesHighlight: 'off',
  renderLineHighlight: 'none',
  wordWrap: 'on',
  tabSize: 2,
} as editor.IEditorOptions;

export function PromptEditor() {
  const { monacoRef, handleEditorWillMount, applyTheme } = useMonacoSetup({
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
      applyTheme(monaco);
      // editor.updateOptions()
    },
    [monacoRef, applyTheme],
  );
  return (
    <div className="flex flex-col items-center justify-center w-full h-full rounded-lg overflow-hidden">
      <Editor
        height="100%"
        width="100%"
        defaultLanguage="document"
        defaultValue="// some comment"
        theme="latitude"
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        beforeMount={handleEditorWillMount}
        onValidate={handleEditorValidation}
        options={options}
      />
    </div>
  );
}
