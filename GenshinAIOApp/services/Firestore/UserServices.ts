import firestore from '@react-native-firebase/firestore';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {ToastAndroid} from 'react-native';

import generateRandomSignature from '../../utils/GenerateRandomSignature';
import {IFirestoreUserData} from '../../interfaces/AuthInterfaces';

async function getFireStoreUser(firebaseId: string) {
  const userRef = firestore().collection('users').doc(firebaseId);

  const userDoc = await userRef.get();

  if (userDoc.exists) {
    return userDoc.data() as IFirestoreUserData;
  } else {
    return null;
  }
}

async function createNewFireStoreUser(
  userCredential: FirebaseAuthTypes.UserCredential,
) {
  const userRef = firestore().collection('users').doc(userCredential.user.uid);

  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    await userRef
      .set({
        firebaseId: userCredential.user.uid,
        enkaId: '',
        isEnkaVerified: false,
        signature: generateRandomSignature(),
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        ToastAndroid.show('User created', ToastAndroid.LONG);
      })
      .catch(error => {
        ToastAndroid.show('Error creating user', ToastAndroid.LONG);
      });
  }
}

async function updateFireStoreUser(
  firebaseId: string,
  enkaId: string,
  userSignature: string,
) {
  const userRef = firestore().collection('users').doc(firebaseId);
  const userDoc = await userRef.get();

  let shouldVerify = false;
  let enkaVerified = true;
  let signature = userSignature;

  if (userDoc.exists) {
    const userData = userDoc.data() as IFirestoreUserData;

    if (!userData.isEnkaVerified) {
      shouldVerify = userData.enkaId === enkaId || userData.enkaId === '';
      enkaVerified = shouldVerify && userData.signature === userSignature;
      signature = enkaVerified ? userSignature : userData.signature;
    }

    await userRef.update({
      enkaId: enkaId,
      isEnkaVerified: enkaVerified,
      signature,
    });
  }
}

export {createNewFireStoreUser, updateFireStoreUser, getFireStoreUser};
