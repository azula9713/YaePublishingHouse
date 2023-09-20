import {atom} from 'recoil';
import {User} from '@react-native-google-signin/google-signin';

export const isLoggedInAtom = atom({
  key: 'isLoggedIn',
  default: false,
});

export const isEmailVerifiedAtom = atom({
  key: 'isEmailVerified',
  default: false,
});

export const googleUserAtom = atom({
  key: 'googleUser',
  default: null as User | null,
});
