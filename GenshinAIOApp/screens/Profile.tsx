import React, {useState, useEffect} from 'react';
import {Text, View, Image, ScrollView, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilState} from 'recoil';
import auth from '@react-native-firebase/auth';

import UserSettings from '../components/Profile/UserSettings';
import About from '../components/Profile/About';
import {enkaUserAtom} from '../atoms/UserAtoms';
import EditUIDModal from '../components/Modals/EditUIDModal';
import {updateFireStoreUser} from '../services/Firestore/UserServices';
import {fetchGenshinProfile} from '../services/EnkaServices';

export default function Profile() {
  const [uid, setUid] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useRecoilState(enkaUserAtom);

  useEffect(() => {
    //check if local storage has user data

    AsyncStorage.getItem('user').then(user => {
      if (user) {
        const userData = JSON.parse(user);
        if (userData.uid === uid || uid === '') {
          setUserData(userData);
          setUid(userData.uid);
        }

        fetchGenshinProfile(uid).then(data => {
          setUserData(data);
          AsyncStorage.setItem('user', JSON.stringify(data));
        });
      }
    });
  }, [uid]);

  useEffect(() => {
    if (auth().currentUser) {
      updateFireStoreUser(
        auth()?.currentUser?.uid ?? '',
        uid,
        userData.signature,
      );
    }
  }, [userData]);

  return (
    <View className="bg-black w-full h-full p-4">
      <ImageBackground
        source={{
          uri:
            userData.profileCard.url ||
            'https://static.wikia.nocookie.net/gensin-impact/images/8/89/Item_Genshin_Impact_A_New_World.png/',
        }}
        style={{borderRadius: 10}}
        imageStyle={{
          borderRadius: 10,
          resizeMode: 'cover',
          width: '100%',
        }}
        className="w-full h-40 mx-auto mt-10 flex flex-row items-center justify-start bg-gray-700 py-4">
        <View
          className="w-full h-40 mx-auto flex flex-row items-center justify-start"
          style={{
            borderRadius: 10,
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}>
          <Image
            source={{
              uri:
                userData.profilePicture.url ||
                'https://static.wikia.nocookie.net/gensin-impact/images/8/89/Item_Genshin_Impact_A_New_World.png/',
            }}
            className="w-32 h-32 rounded-full"
          />
          <View className="flex flex-col items-start justify-center ml-5">
            <Text className="text-white text-2xl font-bold">
              {userData.nickname}
            </Text>
            <Text
              className="text-white text-lg overflow-hidden overflow-ellipsis whitespace-nowrap w-72"
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{maxWidth: 300, lineHeight: 20}}>
              {userData.signature || 'No Genshin Impact UID was found'}
            </Text>
          </View>
        </View>
      </ImageBackground>
      <EditUIDModal
        uid={uid}
        setUid={setUid}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />

      {/* settings options */}
      <ScrollView>
        <UserSettings
          uid={uid}
          setIsModalVisible={setModalVisible}
          setUid={setUid}
        />
        <About />
      </ScrollView>
    </View>
  );
}
