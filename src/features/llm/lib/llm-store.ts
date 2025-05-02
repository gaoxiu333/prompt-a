import type {} from '@redux-devtools/extension';
import { stat } from 'fs';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface LLMStore {
  getStorage: () => Storage;
  apiKeys: {
    xai: string;
    openai: string;
    cohere: string;
    google: string;
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
        },
        setApiKey: (provider: keyof LLMStore['apiKeys'], value: string) =>
          set({ apiKeys: { ...get().apiKeys, [provider]: value } }),
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
