import { Monaco } from '@monaco-editor/react';

import { useCallback, useRef } from 'react';

import { themeRules } from './theme';
import { DocumentError } from './types';
import { useThemeColors } from './use-theme-colors';

export function useMonacoSetup({
  errorFixFn,
}: { errorFixFn?: (errors: DocumentError[]) => void } = {}) {
  const monacoRef = useRef<Monaco | null>(null);
  const themeColors = useThemeColors();
  const applyTheme = useCallback(
    (monaco: Monaco) => {
      monaco.editor.defineTheme('prompt-a', {
        base: 'vs',
        inherit: true,
        rules: themeRules(themeColors),
        colors: {
          'editor.background': themeColors.secondary,
          'editor.foreground': themeColors.foreground,
          'editorLineNumber.activeForeground': themeColors.foreground,
          'editorCursor.foreground': themeColors.foreground,
        },
      });
      monaco.editor.setTheme('prompt-a');
    },
    [themeColors],
  );
  const handleEditorWillMount = useCallback((monaco: Monaco) => {
    if (monacoRef.current) return;
    monaco.languages.register({ id: 'document' });
    // monaco.languages.setMonarchTokensProvider('document', { tokenizer })  // TODO: tokenizer
    monaco.languages.setLanguageConfiguration('document', {
      comments: {
        blockComment: ['/*', '*/'],
      },
    });
    applyTheme(monaco);
    monaco.editor.addCommand({
      id: 'fixErrors',
      run: (_, ...errors: DocumentError[]) => errorFixFn?.(errors),
    });
    // TODO: 这是什么，没研究呢
    // if (errorFixFn) {
    //   const codeActionProvider: languages.CodeActionProvider = {
    //     provideCodeActions: (_, __, context, ___) => {
    //       const actions = [
    //         {
    //           title: 'Fix with copilot',
    //           diagnostics: context.markers,
    //           kind: 'quickfix',
    //           isPreferred: true,
    //           edit: {
    //             edits: [],
    //           },
    //           command: {
    //             id: 'fixErrors',
    //             title: 'Fix with copilot',
    //             arguments: context.markers.map((marker) => ({
    //               message: marker.message,
    //               startLineNumber: marker.startLineNumber,
    //               startColumn: marker.startColumn,
    //             })),
    //           },
    //         },
    //       ];

    //       return {
    //         actions,
    //         dispose: () => {},
    //       };
    //     },
    //   };

    //   const disposable = monaco.languages.registerCodeActionProvider(
    //     'document',
    //     codeActionProvider,
    //   );

    //   return () => {
    //     disposable.dispose();
    //   };
    // }
  }, []);
  return {
    monacoRef,
    handleEditorWillMount,
  };
}
