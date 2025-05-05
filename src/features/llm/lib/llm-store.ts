import type {} from '@redux-devtools/extension';
import { stat } from 'fs';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface LLMStore {
  getStorage: () => Storage;
  setApiKey: (provider: keyof LLMStore['apiKeys'], value: string) => void;
  setApiKeys: (keys: Partial<LLMStore['apiKeys']>) => void;
  apiKeys: {
    xai: string;
    openai: string;
    cohere: string;
    google: string;
    deepseek: string;
  };
}

const useLLMStore = create<LLMStore>()(
  devtools(
    persist(
      (set, get) => ({
        apiKeys: {
          openai: '',
          xai: '',
          cohere: '',
          google: '',
          deepseek: '',
        },
        setApiKey: (provider: keyof LLMStore['apiKeys'], value: string) =>
          set({ apiKeys: { ...get().apiKeys, [provider]: value } }),
        setApiKeys: (keys: Partial<LLMStore['apiKeys']>) =>
          set({ apiKeys: { ...get().apiKeys, ...keys } }),
        getStorage: () => localStorage,
      }),
      {
        name: 'llm-store', // Name of the storage key
      },
    ),
    { name: 'LLM Store' },
  ),
);

export default useLLMStore;
