import { create } from 'zustand';

type LoginStep = 'login' | 'forgetPassword' | 'resetPassword';
type SignupStep = 'signup' | 'verifyCode';

type Step = LoginStep | SignupStep;

type State = {
  open: boolean;
  step: Step;
  email: string;
};

type Actions = {
  setOpen: (opne: boolean) => void;
  setStep: (step: Step) => void;
  setEmail: (email: string) => void;
};

const useGlobalLoginStore = create<State & Actions>((set) => ({
  open: false,
  step: 'login',
  email: '',
  setOpen: (open) => set({ open }),
  setStep: (step) => set({ step }),
  setEmail: (email) => set({ email }),
}));

export default useGlobalLoginStore;
