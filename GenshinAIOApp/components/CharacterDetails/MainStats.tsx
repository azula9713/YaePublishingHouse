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
    <CharacterDataSectionLayout bgColor="#333333" title="Main Stats">
      <View>
        {mainStats.map((mainStat, index) => (
          <View
            className="w-full flex flex-row items-start justify-start"
            key={index}>
            <Text className="text-white text-lg mr-2">{mainStat.slot}:</Text>
            <Text className="text-white text-lg">{mainStat.stats}</Text>
          </View>
        ))}
      </View>
    </CharacterDataSectionLayout>
  );
}
