import { Monaco } from '@monaco-editor/react';

import { useRef } from 'react';

export function useMonacoSetup() {
  const monacoRef = useRef<Monaco | null>(null);

  return {
    monacoRef,
  };
}
