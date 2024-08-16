import { create } from 'zustand';

type State = {
  open: boolean;
};

type Actions = {
  setOpen: (open: boolean) => void;
};

const useLogoutDialogStore = create<State & Actions>((set) => ({
  open: false,
  setOpen: (isOpen) => set({ open: isOpen }),
}));

export default useLogoutDialogStore;
