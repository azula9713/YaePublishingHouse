import React from 'react';
import {Image, ImageProps, Text, View} from 'react-native';

type Props = {
  stat: string;
  icon: ImageProps | Readonly<ImageProps>;
};

export default function SubStatItems({stat, icon}: Props) {
  return (
    <View className="w-full h-full mx-1 flex-row items-center justify-start">
      <Image source={icon} className="w-8 h-8 m-1" />
      <Text className="text-white text-xl m-1">{stat}</Text>
    </View>
  );
}
