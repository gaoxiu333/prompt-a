import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useStore } from 'zustand';

import { useForm } from 'react-hook-form';

import useLLMStore from '../lib/llm-store';
// TODO: 这里的 formSchema 需要根据实际的表单数据进行修改

const formSchema = z.object({
  xai: z.string(),
  openai: z.string(),
  deepseek: z.string(),
});

const useLLMConfig = () => {
  const llmApiKeys = useStore(useLLMStore, (store) => store.apiKeys);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('Form submitted:', data);
  };

  return {
    llmApiKeys,
    form,
    onSubmit,
  };
};

export default useLLMConfig;
