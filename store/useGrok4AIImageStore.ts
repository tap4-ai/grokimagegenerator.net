import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';

export const STORE_NAME = 'grok4-ai-image-store';
export interface History {
  prompt: string;
  aspectRatio: { width: number; height: number };
  imageUrl?: string;
  status: 'await' | 'failed' | 'success';
  key: string;
  createTimestamp: number;
}
interface Grok4AIImageStore {
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
export const useGrok4AIImageStore = create(
  persist<Grok4AIImageStore>(
    (set) => ({
      prompt: '',
      aspectRatio: {
        width: 16,
        height: 9,
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
export interface Grok4AIImageStoreForGenerator extends Omit<Grok4AIImageStore, 'emptyHistory' | 'removeHistory'> {
  storeName: string;
}

export const useGrok4AIImageStoreForGenerator = (): Grok4AIImageStoreForGenerator => {
  const storeData = useGrok4AIImageStore(
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
