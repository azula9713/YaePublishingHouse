import React from 'react';
import {Text, View} from 'react-native';

import CharacterDataSectionLayout from './../CharacterDataSectionLayout';

type Props = {
  mainStats: {
    slot: string;
    stats: string;
  }[];
};

export default function MainStats({mainStats}: Props) {
  return (
    <CharacterDataSectionLayout bgColor="#1d1d1d" title="Main Stats">
      <View className="w-full">
        {mainStats.map((mainStat, index) => (
          <View
            className="w-max flex flex-row items-start justify-start max-w-[75%]"
            key={index}>
            <Text className="text-white text-lg mr-2">{mainStat.slot}:</Text>
            <Text className="text-white text-lg">{mainStat.stats}</Text>
          </View>
        ))}
      </View>
    </CharacterDataSectionLayout>
  );
}
