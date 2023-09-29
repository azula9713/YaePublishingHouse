import React from 'react';
import {Image, ImageProps, Text, View} from 'react-native';

type Props = {
  name: string;
  icon: ImageProps | Readonly<ImageProps>;
};

export default function MainStatItem({name, icon}: Props) {
  return (
    <View className="w-full h-full m-1 flex-row items-center justify-start">
      <Image source={icon} className="w-10 h-10 m-1" />
      <Text className="text-white font-bold text-xl m-1">{name}</Text>
    </View>
  );
}
