'use client';

import { createXai } from '@ai-sdk/xai';
import { generateText } from 'ai';
import { useStore } from 'zustand';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import useLLMStore from '@/features/llm/lib/llm-store';

import EditorWrapper from './editor-wrapper';

export function PromptEditor() {
  const [value] = useState<string | undefined>(undefined);
  const llmApiKeys = useStore(useLLMStore, (state) => state.apiKeys);

  const submit = async () => {
    const xai = createXai({
      apiKey: llmApiKeys.xai,
    });
    const { text } = await generateText({
      model: xai('grok-3'),
      prompt: value,
    });
    console.log('text:', text);
    // submit the value to ai
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full rounded-lg overflow-hidden">
      <EditorWrapper />
      <div className="flex-0">
        <Button onClick={submit}>提交</Button>
      </div>
    </div>
  );
}
