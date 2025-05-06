'use client';

import LLMProvider from '@/features/llm/components/llm-provider';
import { PromptEditor } from '@/features/prompt-manage/components/prompt-editor';

const PromptEditorLayout = () => {
  return (
    <div className="p-4 h-full w-full flex flex-col gap-4 items-center justify-start">
      <LLMProvider />
      <PromptEditor />
    </div>
  );
};

export default PromptEditorLayout;
