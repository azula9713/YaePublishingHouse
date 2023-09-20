import React from 'react';
import {Image, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {RootStackParams} from '../navigation/RootStackParams';
import {useSetRecoilState} from 'recoil';
import {googleUserAtom, isLoggedInAtom} from '../atoms/AuthAtoms';
import {createNewFireStoreUser} from '../services/Firestore/UserServices';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParams, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

GoogleSignin.configure({
  webClientId:
    '490220612649-hl6pm09a83si1n0jiosi3p263pchs5ub.apps.googleusercontent.com',
});

export default function Login({navigation}: Props) {
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const setGoogleUser = useSetRecoilState(googleUserAtom);

  async function signInWithGoogle() {
    try {
      // Get the users ID token
      const response = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(
        response.idToken,
      );

      // Sign-in the user with the credential and store the user
      setGoogleUser(response);
      AsyncStorage.setItem('googleUser', JSON.stringify(response));
      ToastAndroid.show(`Welcome ${response.user.name}`, ToastAndroid.LONG);
      auth()
        .signInWithCredential(googleCredential)
        .then(user => {
          setIsLoggedIn(true);
          createNewFireStoreUser(user);
        });
    } catch (error) {
      console.log({error});
      ToastAndroid.show('Error signing in with Google', ToastAndroid.LONG);
    }
  }

  async function anonymousSignIn() {
    try {
      await auth()
        .signInAnonymously()
        .then(() => {
          AsyncStorage.setItem('isAnonymous', 'true');
          ToastAndroid.show('Signed in anonymously', ToastAndroid.LONG);
        });
    } catch (error) {
      console.log({error});
      ToastAndroid.show('Error signing in anonymously', ToastAndroid.LONG);
    }
  }

  return (
    <View className="bg-black w-full h-full p-4">
      <View className="w-full h-full flex items-start justify-center">
        <Text className="text-white text-5xl font-bold">Login</Text>

        {/* sign in with google */}
        <View className="flex flex-row items-center justify-center p-2 w-full mt-5">
          <TouchableOpacity
            className="flex flex-row items-center justify-center border-2 border-gray-400 w-5/6 p-3 rounded-lg"
            onPress={() => {
              signInWithGoogle();
            }}>
            <Image
              source={require('../assets/images/search.png')}
              style={{
                width: 32,
                height: 32,
                resizeMode: 'contain',
              }}
            />
            <Text className="text-white text-2xl font-bold ml-4">
              Sign in with Google
            </Text>
          </TouchableOpacity>
        </View>

        {/* skip and head to home */}
        <TouchableOpacity
          className="flex flex-row items-center justify-center w-full p-3 rounded-lg mt-5"
          onPress={
            //anonymousSignIn
            () => {
              AsyncStorage.setItem('isAnonymous', 'true');
              anonymousSignIn().then(() => {
                setIsLoggedIn(true);
              });
            }
          }>
          <Text className="text-gray-400 text-lg font-bold ml-4">
            Sign in anonymously
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
