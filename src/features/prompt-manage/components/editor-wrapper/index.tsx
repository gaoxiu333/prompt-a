'use client';

import { lazy, useEffect, useState } from 'react';

import { EditorPropsWithRef } from '../editor/types';
import EditorPlaceholder from './editor-placeholder';

const DocumentTextEditor = lazy(() => import('../editor'));

const EditorWrapper = (props: EditorPropsWithRef) => {
  const [isBrowserReady, setIsBrowserReady] = useState(false);
  useEffect(() => {
    setIsBrowserReady(typeof window !== 'undefined');
  }, []);
  if (!isBrowserReady) return <EditorPlaceholder />;
  return <DocumentTextEditor {...props} />;
};
export default EditorWrapper;
