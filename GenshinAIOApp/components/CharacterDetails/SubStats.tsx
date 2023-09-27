import React from 'react';
import {View, Text} from 'react-native';

import CharacterDataSectionLayout from './../CharacterDataSectionLayout';

type Props = {
  subStats: {
    stats: string[];
    rank: number;
  }[];
};

export default function SubStats({subStats}: Props) {
  return (
    <CharacterDataSectionLayout bgColor="#1d1d1d" title="Sub Stats">
      <View className="flex flex-row flex-wrap">
        {subStats.map((subStat, index) => (
          <View
            className="w-full flex flex-row items-start justify-start"
            key={index}>
            <Text className="text-white text-lg mr-2">
              {subStat.rank + `.`}
            </Text>
            <Text className="text-white text-lg">
              {subStat.stats.join('/ ')}
            </Text>
          </View>
        ))}
      </View>
    </CharacterDataSectionLayout>
  );
}
