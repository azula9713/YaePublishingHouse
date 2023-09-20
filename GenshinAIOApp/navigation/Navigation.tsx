import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {User} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

import {googleUserAtom, isLoggedInAtom} from '../atoms/AuthAtoms';
import Tabs from './Tabs';
import AuthStackNavigator from './AuthStack';
import {enkaUserAtom, firestoreUserAtom} from '../atoms/UserAtoms';
import {getFireStoreUser} from '../services/Firestore/UserServices';
import {fetchGenshinProfile} from '../services/EnkaServices';
import {IFirestoreUserData} from '../interfaces/AuthInterfaces';

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
  const [googleUser, setGoogleUser] = useRecoilState(googleUserAtom);
  const setEnkaUser = useSetRecoilState(enkaUserAtom);
  const setFirestoreUser = useSetRecoilState(firestoreUserAtom);

  const [isAnonymous, setIsAnonymous] = useState(false);

  async function getGoogleUser() {
    const googleUser = await AsyncStorage.getItem('googleUser');
    if (googleUser) {
      setGoogleUser(JSON.parse(googleUser) as User);
    }
  }

  async function getIsAnonymous() {
    const isAnonymous = await AsyncStorage.getItem('isAnonymous');

    if (isAnonymous === 'true') {
      setIsAnonymous(true);
    }
  }

  useEffect(() => {
    getGoogleUser();
    getIsAnonymous();
  }, []);

  useEffect(() => {
    //if googleuser is valid, set isloggedin to true
    if (googleUser) {
      auth().onAuthStateChanged(user => {
        if (user) {
          setIsLoggedIn(true);

          const fireStoreUser = getFireStoreUser(user.uid);

          fireStoreUser.then(data => {
            setFirestoreUser(data as IFirestoreUserData);
            if (data?.isEnkaVerified && data?.enkaId !== '') {
              const enkaUser = fetchGenshinProfile(data.enkaId);
              enkaUser.then(data => {
                setEnkaUser(data);
                AsyncStorage.setItem('user', JSON.stringify(data));
              });
            }
          });
        }
      });
    }

    //unsubscribe from authstatechanged
    return () => {
      auth().onAuthStateChanged(() => {});
    };
  }, [googleUser]);

  return (
    <NavigationContainer>
      {isLoggedIn || isAnonymous ? <Tabs /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}
