import { create } from 'zustand';

type Step = 'signup' | 'verifyCode';

type State = {
  step: Step;
  email: string;
};

type Actions = {
  setStep: (step: Step) => void;
  setEmail: (email: string) => void;
};

const useSignupStepStore = create<State & Actions>((set) => ({
  step: 'signup',
  email: '',
  setStep: (step) => set({ step }),
  setEmail: (email) => set({ email }),
}));

export default useSignupStepStore;
