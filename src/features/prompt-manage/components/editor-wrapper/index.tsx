'use client';

import { lazy } from 'react';

import { EditorPropsWithRef } from '../editor/types';

const DocumentTextEditor = lazy(() => import('../editor'));

const EditorWrapper = (props: EditorPropsWithRef) => {
  return <DocumentTextEditor {...props} />;
};
export default EditorWrapper;
