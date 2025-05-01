import type {} from '@redux-devtools/extension';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface LLMStore {
  getStorage: () => Storage;
}

const useLLMStore = create<LLMStore>()(
  devtools(
    persist(
      (set) => ({
        // Define your state and actions here
        getStorage: () => localStorage,
      }),
      {
        name: 'llm-store', // Name of the storage key
      },
    ),
    { name: 'LLM Store' },
  ),
);
