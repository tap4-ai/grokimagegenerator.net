import { create } from 'zustand';

type State = {
  open: boolean;
};

type Actions = {
  setOpen: (open: boolean) => void;
};

const useInsufficientCreditsStore = create<State & Actions>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));

export default useInsufficientCreditsStore;
