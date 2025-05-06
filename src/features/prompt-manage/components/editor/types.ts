import { EditorProps } from '@monaco-editor/react';
import { editor } from 'monaco-editor';

import { Ref } from 'react';

export type DocumentError = {
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
  message: string;
};

export interface EditorPropsWithRef extends EditorProps {
  editorRef?: Ref<editor.IStandaloneCodeEditor | null>;
  className?: string;
  autoFocus?: boolean;
}
