import { create } from 'zustand';

type State = {
  open: boolean;
};

type Actions = {
  setOpen: (open: boolean) => void;
};

const useloginExpireDialogStore = create<State & Actions>((set) => ({
  open: false,
  setOpen: (isOpen) => set({ open: isOpen }),
}));

export default useloginExpireDialogStore;
