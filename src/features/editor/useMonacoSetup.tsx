import { Monaco } from '@monaco-editor/react';
import { type languages } from 'monaco-editor';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useTheme } from 'next-themes';

import { ThemeColors, recalculateColors, themeRules, tokenizer } from './utils';

export const useThemeColors = () => {
  const { theme } = useTheme();
  const [themeColors, setThemeColors] = useState<ThemeColors | null>(null);
  useEffect(() => {
    // TODO: 这里的颜色需要确保 window.getComputedStyle 可以获取到诸如到样式，不然会导致颜色不对
    // setTimeout(() => setThemeColors(recalculateColors()), 0);
    setThemeColors(recalculateColors());
  }, [theme]);

  return themeColors;
};
export type DocumentError = {
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
  message: string;
};

export function useMonacoSetup({
  errorFixFn,
}: {
  errorFixFn?: (errors: DocumentError[]) => void;
} = {}) {
  const monacoRef = useRef<Monaco | null>(null);

  const applyTheme = (monaco: Monaco) => {
    const themeColors = recalculateColors();
    if (!themeColors) return;
    monaco.editor.defineTheme('latitude', {
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

    monaco.editor.setTheme('latitude');
  };

  const handleEditorWillMount = useCallback((monaco: Monaco) => {
    monaco.languages.register({ id: 'document' });
    monaco.languages.setMonarchTokensProvider('document', { tokenizer });
    monaco.languages.setLanguageConfiguration('document', {
      comments: {
        blockComment: ['/*', '*/'],
      },
    });

    monaco.editor.addCommand({
      id: 'fixErrors',
      run: (_, ...errors: DocumentError[]) => errorFixFn?.(errors),
    });

    if (errorFixFn) {
      const codeActionProvider: languages.CodeActionProvider = {
        provideCodeActions: (_, __, context) => {
          const actions = [
            {
              title: 'Fix with copilot',
              diagnostics: context.markers,
              kind: 'quickfix',
              isPreferred: true,
              edit: {
                edits: [],
              },
              command: {
                id: 'fixErrors',
                title: 'Fix with copilot',
                arguments: context.markers.map((marker) => ({
                  message: marker.message,
                  startLineNumber: marker.startLineNumber,
                  startColumn: marker.startColumn,
                })),
              },
            },
          ];

          return {
            actions,
            dispose: () => {},
          };
        },
      };

      const disposable = monaco.languages.registerCodeActionProvider(
        'document',
        codeActionProvider,
      );

      return () => {
        disposable.dispose();
      };
    }
  }, []);
  return {
    monacoRef,
    applyTheme,
    handleEditorWillMount,
  };
}
