'use client';

import { useEffect, useState } from 'react';

import LLMProvider from '@/features/llm/commponents/llm-provider';
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

  return (
    <div className="p-4 h-full w-full flex flex-col gap-4 items-center justify-start">
      <LLMProvider />
      {isReady ? <PromptEditor /> : null}
    </div>
  );
};

export default PromptEditorLayout;
