import { atom } from 'recoil';

type View = 'login' | 'signup' | 'resetPassword';

export interface AuthModalState {
  open: boolean;
  view: View;
}

const defaultAuthModalState: AuthModalState = {
  open: false,
  view: 'login',
};

export const authModalState = atom<AuthModalState>({
  key: 'authModalState',
  default: defaultAuthModalState,
});
