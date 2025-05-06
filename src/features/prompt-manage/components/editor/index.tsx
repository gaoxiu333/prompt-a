import MSEditor, { EditorProps, Monaco } from '@monaco-editor/react';
import clsx from 'clsx';
import { MarkerSeverity, Range, Selection, type editor } from 'monaco-editor';

import { useCallback } from 'react';

import { registerActions } from './comment-action';
import { options } from './theme';
import { EditorPropsWithRef } from './types';
import { useMonacoSetup } from './use-monaco-setup';

function getEditorLine({ model }: { model: editor.ITextModel }): number {
  const lastLine = model.getLineCount();
  const lastLineText = model.getLineContent(lastLine);

  if (lastLineText.trim() !== '---') return lastLine;

  model.pushEditOperations(
    [],
    [
      {
        range: new Range(lastLine + 1, 1, lastLine + 1, 1),
        text: '\n',
        forceMoveMarkers: true,
      },
    ],
    () => null,
  );
  return lastLine + 1;
}

function moveFocusAtEnd(editor: editor.IStandaloneCodeEditor) {
  editor.focus();

  const model = editor.getModel();
  if (!model) return;

  const lastLine = getEditorLine({ model });
  const lastColumn = model.getLineMaxColumn(lastLine);

  editor.setSelection(
    new Selection(lastLine, lastColumn, lastLine, lastColumn),
  );
}

const Editor = ({
  className,
  editorRef,
  autoFocus,
  ...props
}: EditorPropsWithRef) => {
  const { monacoRef, handleEditorWillMount } = useMonacoSetup({
    errorFixFn: () => {}, // TODO: 这里的错误修复函数需要实现
  });

  const handleEditorDidMount = useCallback(
    (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
      monacoRef.current = monaco;

      if (typeof editorRef === 'function') {
        editorRef(editor);
      } else if (editorRef && 'current' in editorRef) {
        editorRef.current = editor;
      }

      if (autoFocus) {
        moveFocusAtEnd(editor);
      }

      registerActions(editor, monaco); // 注册注释操作
      // setIsEditorMounted(true);
    },
    [autoFocus, editorRef, monacoRef],
  );

  return (
    <MSEditor
      className={clsx(className)} // TODO: add className to editor
      width="100%"
      defaultLanguage="document"
      beforeMount={handleEditorWillMount}
      onMount={handleEditorDidMount}
      defaultValue="---\n\n---"
      theme="prompt-a"
      options={options}
      {...props}
    />
  );
};

export default Editor;
