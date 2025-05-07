'use client';

import { useStore } from 'zustand';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import useLLMStore from '@/features/llm/lib/llm-store';
import usePrompt from '@/features/prompts/hook/use-prompt';

import EditorWrapper from './editor-wrapper';

export function PromptEditor() {
  const [value] = useState<string | undefined>(undefined);
  const { prompt, setPrompt } = usePrompt();
  const llmApiKeys = useStore(useLLMStore, (state) => state.apiKeys);

  const submit = async () => {
    setPrompt(value);
  };
  function handleChange(value: string | undefined = '') {
    setPrompt(value);
  }
  return (
    <div className="flex flex-col items-center justify-center w-full h-full rounded-lg overflow-hidden">
      <EditorWrapper value={prompt} onChange={handleChange} />
      <div className="flex-0">
        <Button onClick={submit}>提交</Button>
      </div>
    </div>
  );
}
