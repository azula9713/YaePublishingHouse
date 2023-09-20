import React from 'react';
import {Text, View} from 'react-native';

import CharacterDataSectionLayout from './../CharacterDataSectionLayout';
import {ITalentPriority} from '../../interfaces/BuildsInterface';

type Props = {
  talents: ITalentPriority;
};

export default function TalenPriority({talents}: Props) {
  return (
    <CharacterDataSectionLayout bgColor="#333333" title="Talent Priority">
      <View>
        {talents.talents.map((talent, index) => (
          <View
            className="w-full flex flex-row items-start justify-start"
            key={index}>
            <Text className="text-white text-lg mr-2">{talent.rank + `.`}</Text>
            <Text className="text-white text-lg">{talent.name}</Text>
          </View>
        ))}
      </View>
      {talents.notes.length > 0 && (
        <View className="w-full flex flex-row items-start justify-start">
          <Text className="text-white text-lg mr-2">{talents.notes}</Text>
        </View>
      )}
    </CharacterDataSectionLayout>
  );
}
