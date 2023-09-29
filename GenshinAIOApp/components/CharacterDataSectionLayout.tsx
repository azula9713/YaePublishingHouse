import React from 'react';
import {Text, View} from 'react-native';

type Props = {
  children: React.ReactNode;
  bgColor: string;
  title: string;
};

export default function CharacterDataSectionLayout({
  children,
  bgColor,
  title,
}: Props) {
  return (
    <View
      className={`w-full flex items-start justify-start rounded-lg py-2 px-4 my-1 h-max`}
      style={{backgroundColor: bgColor}}>
      <Text className="text-white text-2xl font-bold mb-1">{title}</Text>
      {children}
    </View>
  );
}
