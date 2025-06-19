import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';

import type { History } from './useFluxAIImageStore';

export const STORE_NAME = 'janus-pro-ai-image-store';

interface JanusProImageStore {
  prompt: string;
  aspectRatio: { width: number; height: number };
  history: History[];
  setPrompt: (prompt: string) => void;
  setAspectRatio: (aspectRatio: { width: number; height: number }) => void;
  addHistory: (history: History) => void;
  updateHistory: (key: string, history: Partial<History>) => void;
  removeHistory: (key: string) => void;
  emptyHistory: () => void;
}
export const useJanusProImageStore = create(
  persist<JanusProImageStore>(
    (set) => ({
      prompt: '',
      aspectRatio: {
        width: 1,
        height: 1,
      },
      history: [],
      setPrompt: (prompt: string) => set({ prompt }),
      setAspectRatio: (aspectRatio: { width: number; height: number }) => set({ aspectRatio }),
      addHistory: (history: History) => set((state) => ({ history: [...state.history, history] })),
      updateHistory: (key: string, history: Partial<History>) =>
        set((state) => ({ history: state.history.map((item) => (item.key === key ? { ...item, ...history } : item)) })),
      removeHistory: (key: string) => set((state) => ({ history: state.history.filter((item) => item.key !== key) })),
      emptyHistory: () => set({ history: [] }),
    }),
    {
      name: STORE_NAME, // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);

// Hook wrapper for ImagePromptGenerator component
export interface JanusProImageStoreForGenerator extends Omit<JanusProImageStore, 'emptyHistory' | 'removeHistory'> {
  storeName: string;
}

export const useJanusProImageStoreForGenerator = (): JanusProImageStoreForGenerator => {
  const storeData = useJanusProImageStore(
    useShallow((state) => ({
      prompt: state.prompt,
      aspectRatio: state.aspectRatio,
      setPrompt: state.setPrompt,
      setAspectRatio: state.setAspectRatio,
      addHistory: state.addHistory,
      updateHistory: state.updateHistory,
      history: state.history,
    })),
  );

  return {
    ...storeData,
    storeName: STORE_NAME,
  };
};
