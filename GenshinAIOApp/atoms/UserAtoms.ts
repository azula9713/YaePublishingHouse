import {atom} from 'recoil';

export const enkaUserAtom = atom({
  key: 'enkaUserAtom',
  default: {
    uid: '',
    nickname: '',
    signature: '',
    profilePicture: {
      id: '',
      name: '',
      url: '',
    },
    profileCard: {
      id: '',
      name: '',
      url: '',
    },
  },
});

export const firestoreUserAtom = atom({
  key: 'firestoreUserAtom',
  default: {
    firebaseId: '',
    enkaId: '',
    isEnkaVerified: false,
    signature: '',
    createdAt: null,
  },
});
