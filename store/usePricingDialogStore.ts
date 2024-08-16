import { create } from 'zustand';

type State = {
  imageUrl: string;
  imageName: string;
  open: boolean;
};

type Actions = {
  setOpen: (open: boolean) => void;
  setOpenWithImage: (url: string, name: string) => void;
  setCloseAndResetImage: () => void;
  setImageUrl: (url: string, name: string) => void;
};

const usePricingDialogStore = create<State & Actions>((set) => ({
  open: false,
  imageUrl: '',
  imageName: '',
  setOpen: (isOpen) => set({ open: isOpen }),
  setOpenWithImage: (url, name) => set({ open: true, imageUrl: url, imageName: name }),
  setCloseAndResetImage: () => set({ open: false, imageUrl: '', imageName: '' }),
  setImageUrl: (url, name) => set({ imageUrl: url, imageName: name }),
}));

export default usePricingDialogStore;
