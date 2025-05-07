'use client';

import { createXai } from '@ai-sdk/xai';
import { generateText } from 'ai';
import { useStore } from 'zustand';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import useLLMStore from '@/features/llm/lib/llm-store';
import usePromptStore from '@/features/prompts/lib/prompt-store';

import { useMessagesStore } from '../../lib/messages-store';
import MessageBubble from '../message-bubble';

const ChatContainer = () => {
  const { messages, addMessage, clearMessages } = useMessagesStore();
  const { prompt } = usePromptStore();
  const llmApiKeys = useStore(useLLMStore, (state) => state.apiKeys);
  const [isLoading, setIsLoading] = useState(false);
  async function onSubmit() {
    setIsLoading(true);
    const xai = createXai({
      apiKey: llmApiKeys.xai,
    });
    const { text, ...other } = await generateText({
      model: xai('grok-3'),
      messages: messages.map((item) => ({
        role: item.role,
        content: item.content,
      })),
    });
    console.log('other:', other);
    addMessage({ content: text, role: 'assistant' });
    setIsLoading(false);
  }

  useEffect(() => {
    clearMessages();
    addMessage({ content: '你是一只可爱的小猫咪', role: 'system' });
    addMessage({ content: prompt, role: 'user' });
  }, [prompt, addMessage, clearMessages]);
  return (
    <div className="flex flex-col h-full relative">
      <Card className="flex-1 p-4 mb-4">
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-4">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                role={message.role}
                content={message.content}
              />
            ))}
          </div>
        </ScrollArea>
      </Card>
      <div className="flex gap-2 absolute bottom-0 left-0 right-0 h-40 bg-amber-300/10 p-4">
        <Button disabled={isLoading} className="flex-1" onClick={onSubmit}>
          {isLoading ? '发送中...' : '发送'}
        </Button>
      </div>
    </div>
  );
};

export default ChatContainer;
