'use client';

import { createXai, xai } from '@ai-sdk/xai';
import { Monaco } from '@monaco-editor/react';
import { generateText } from 'ai';
import { type editor } from 'monaco-editor';
import { useStore } from 'zustand';

import { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useMonacoSetup } from '@/features/editor/useMonacoSetup';
import useLLMStore from '@/features/llm/lib/llm-store';

import Editor from './editor';
import EditorWrapper from './editor-wrapper';

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
  const [value, setValue] = useState<string | undefined>(undefined);
  const llmApiKeys = useStore(useLLMStore, (state) => state.apiKeys);

  function handleEditorChange(value: string | undefined) {
    // here is the current value
    setValue(value);
  }

  function handleEditorValidation() {
    // model markers
    // markers.forEach(marker => console.log('onValidate:', marker.message));
  }
  const submit = async () => {
    const xai = createXai({
      apiKey: llmApiKeys.xai,
    });
    const { text } = await generateText({
      model: xai('grok-3'),
      prompt: value,
    });
    console.log('text:', text);
    // submit the value to ai
  };
  const handleEditorDidMount = useCallback(
    (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
      monacoRef.current = monaco;
      applyTheme(monaco);
    },
    [monacoRef, applyTheme],
  );
  return (
    <div className="flex flex-col items-center justify-center w-full h-full rounded-lg overflow-hidden box-">
      <EditorWrapper
        // className="flex-1"
        // width="100%"
        // defaultLanguage="document"
        // defaultValue="// some comment"
        // theme="latitude"
        // onChange={handleEditorChange}
        // onMount={handleEditorDidMount}
        // beforeMount={handleEditorWillMount}
        // onValidate={handleEditorValidation}
        // options={options}
      />
      <div className="flex-0">
        <Button onClick={submit}>提交</Button>
      </div>
    </div>
  );
}
