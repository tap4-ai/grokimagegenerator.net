import { create } from 'zustand';

type State = {
  imageUrl: string;
  imageName: string;
  open: boolean;
  openInsufficientCreditsDialog: boolean;
};

type Actions = {
  setOpen: (open: boolean) => void;
  setOpenInsufficientCreditsDialog: (open: boolean) => void;
  setOpenWithImage: (url: string, name: string) => void;
  setCloseAndResetImage: () => void;
  setImageUrl: (url: string, name: string) => void;
};

const usePricingDialogStore = create<State & Actions>((set) => ({
  open: false,
  imageUrl: '',
  imageName: '',
  openInsufficientCreditsDialog: false,
  setOpen: (isOpen) => set({ open: isOpen }),
  setOpenInsufficientCreditsDialog: (isOpen) => set({ openInsufficientCreditsDialog: isOpen }),
  setOpenWithImage: (url, name) => set({ open: true, imageUrl: url, imageName: name }),
  setCloseAndResetImage: () => set({ open: false, imageUrl: '', imageName: '' }),
  setImageUrl: (url, name) => set({ imageUrl: url, imageName: name }),
}));

export default usePricingDialogStore;
