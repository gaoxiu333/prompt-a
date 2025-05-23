import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useStore } from 'zustand';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import useLLMStore from '../lib/llm-store';

// TODO: 这里的 formSchema 需要根据实际的表单数据进行修改

export const formSchema = z.object({
  xai: z.string(),
  openai: z.string(),
  deepseek: z.string(),
});

const useLLMConfig = () => {
  const llmApiKeys = useStore(useLLMStore, (state) => state.apiKeys);
  const setLLMApiKeys = useStore(useLLMStore, (state) => state.setApiKeys);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...llmApiKeys },
  });
  useEffect(() => {
    form.reset({ ...llmApiKeys });
  }, [form, llmApiKeys]);
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setLLMApiKeys(data);
  };

  return {
    llmApiKeys,
    form,
    onSubmit,
  };
};

export default useLLMConfig;
