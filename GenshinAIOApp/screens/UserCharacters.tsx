import React from 'react';
import {Button, Text, TextInput, View} from 'react-native';

type Props = {};

export default function UserCharacters() {
  const [userId, setUserId] = React.useState('');

  async function fetchUserCharacters(userId: string) {
    //fetch user characters
  }

  return (
    <View className="bg-black w-full h-full p-4">
      {/* enter user Id textbox */}
      <View className="flex flex-row items-center justify-between">
        <TextInput
          className="w-1/2 text-white text-xl font-bold border-2 border-white rounded-md p-2"
          placeholder="Enter User ID"
          placeholderTextColor="#fff"
          onChangeText={text => setUserId(text)}
          value={userId}
        />
        <Button
          title="Search"
          onPress={() => {
            fetchUserCharacters(userId);
          }}
        />
      </View>
    </View>
  );
}
