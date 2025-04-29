'use client';

import { useEffect, useState } from 'react';

import { PromptEditor } from '@/features/prompt-manage/components/prompt-editor';

const PromptEditorLayout = () => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return <>{isReady ? <PromptEditor /> : null}</>;
};

export default PromptEditorLayout;
