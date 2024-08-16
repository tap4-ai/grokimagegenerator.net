import { create } from 'zustand';

type Step = 'login' | 'forgetPassword' | 'resetPassword';

type State = {
  step: Step;
  email: string;
};

type Actions = {
  setStep: (step: Step) => void;
  setEmail: (email: string) => void;
};

const useLoginStepStore = create<State & Actions>((set) => ({
  step: 'login',
  email: '',
  setStep: (step) => set({ step }),
  setEmail: (email) => set({ email }),
}));

export default useLoginStepStore;
