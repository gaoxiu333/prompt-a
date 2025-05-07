import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface PromptStore {
  prompt: string;
  getStorage: () => Storage;
  setPrompt: (prompt: string | undefined) => void;
}

const usePromptStore = create<PromptStore>()(
  devtools(
    persist(
      (set, get) => ({
        prompt: '',
        setPrompt: (prompt: string | undefined) =>
          set({ prompt: prompt || '' }),
        getStorage: () => localStorage,
      }),
      {
        name: 'prompt-store', // Name of the storage key
      },
    ),
    { name: 'Prompt Store' },
  ),
);

export default usePromptStore;
