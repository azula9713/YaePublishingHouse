import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Linking,
} from 'react-native';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {User} from '@react-native-google-signin/google-signin';

import SettingSection from './SettingSection';

import ENLang from '../../static/messages.EN.json';
import {googleUserAtom, isLoggedInAtom} from '../../atoms/AuthAtoms';
import {firestoreUserAtom} from '../../atoms/UserAtoms';

type UserSettingsProps = {
  uid: string;
  setUid: (uid: string) => void;
  setIsModalVisible: (isVisible: boolean) => void;
};

export default function UserSettings({
  uid,
  setUid,
  setIsModalVisible,
}: UserSettingsProps) {
  const [googleUser, setGoogleUser] = useRecoilState(googleUserAtom);
  const fireStoreUserData = useRecoilValue(firestoreUserAtom);
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);

  function removeGenshinProfile() {
    setUid('');
    AsyncStorage.removeItem('user');
    ToastAndroid.show(ENLang.signOut, ToastAndroid.SHORT);
  }

  function firebaseSignOut() {
    auth()
      .signOut()
      .catch(error => {
        ToastAndroid.show(ENLang.signOut, ToastAndroid.SHORT);
      })
      .finally(() => {
        AsyncStorage.removeItem('googleUser');
        AsyncStorage.setItem('isAnonymous', 'false');
        setGoogleUser({} as User);
        setIsLoggedIn(false);
        removeGenshinProfile();
      });
  }

  return (
    <View className="flex flex-col items-start justify-start mt-10">
      <Text className="text-white text-4xl font-bold">Settings</Text>
      {/* logout icon */}
      <SettingSection
        title="Account"
        icon="sign-out-alt"
        iconFunction={firebaseSignOut}>
        <View className="flex flex-col items-start justify-start mt-2 w-full">
          <TouchableOpacity className="flex flex-row items-center justify-between px-4 w-full bg-gray-700 py-2 rounded-lg my-1">
            <Text className="text-white text-lg font-bold">Email</Text>
            <Text className="text-gray-400 text-lg ml-2">
              {
                //if user is logged in with google, show email, else show anonymous
                googleUser?.user?.email ?? 'Anonymous'
              }
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex flex-row items-center justify-between px-4 w-full bg-gray-700 py-2 rounded-lg my-1"
            onPress={() => setIsModalVisible(true)}>
            <Text className="text-white text-lg font-bold">
              Genshin Impact UID
            </Text>
            <Text className="text-gray-200 text-lg ml-2">
              {uid
                ? `${uid} ${
                    fireStoreUserData?.isEnkaVerified
                      ? '✅'
                      : fireStoreUserData?.enkaId !== ''
                      ? '❌'
                      : ''
                  }`
                : 'Set UID'}
            </Text>
          </TouchableOpacity>
        </View>
      </SettingSection>
      <SettingSection title="Application">
        <TouchableOpacity className="flex flex-col items-start justify-start mt-2 w-full">
          <TouchableOpacity className="flex flex-row items-center justify-between px-4 w-full bg-gray-700 py-2 rounded-lg my-1">
            <Text className="text-white text-lg font-bold">Display Mode</Text>
            <Icon name="moon" size={20} className="text-gray-400" solid />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex flex-row items-center justify-between px-4 w-full bg-gray-700 py-2 rounded-lg my-1"
            onPress={() => {
              //show a toast saying only available in premium
              ToastAndroid.show(
                'This feature is available for premium users only',
                ToastAndroid.SHORT,
              );
            }}>
            <Text className="text-white text-lg font-bold">Theme Color</Text>
            <View
              className="w-7 h-7 rounded-lg"
              style={{backgroundColor: '#9333EA'}}
            />
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row items-center justify-between px-4 w-full bg-gray-700 py-2 rounded-lg my-1">
            <Text className="text-white text-lg font-bold">Language</Text>
            <Text className="text-gray-200 text-lg ml-2">English</Text>
          </TouchableOpacity>
          <View className="flex flex-row items-center justify-between px-4 w-full bg-gray-700 py-2 rounded-lg my-1">
            <Text className="text-white text-lg font-bold">Version</Text>
            <Text className="text-gray-400 text-lg ml-2">0.0.1 beta</Text>
          </View>
        </TouchableOpacity>
      </SettingSection>
      <SettingSection title="Support">
        <View className="flex flex-col items-start justify-start mt-2 w-full">
          <TouchableOpacity className="flex flex-row items-center justify-between px-4 w-full bg-gray-700 py-2 rounded-lg my-1">
            <Text className="text-white text-lg font-bold">Report a bug</Text>
            <Icon name="bug" size={20} className="text-gray-400" />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex flex-row items-center justify-between px-4 w-full bg-gray-700 py-2 rounded-lg my-1"
            //open email app with pre-filled email
            onPress={() => {
              Linking.openURL(
                'mailto: support@yaepublishinghouse.me?subject=Genshin Impact AIO Support',
              );
            }}>
            <Text className="text-white text-lg font-bold">Contact us</Text>
            <Icon name="envelope" size={20} className="text-gray-400" solid />
          </TouchableOpacity>
        </View>
      </SettingSection>
    </View>
  );
}
