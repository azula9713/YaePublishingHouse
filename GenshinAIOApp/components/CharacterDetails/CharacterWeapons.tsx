import React from 'react';
import {Text, View} from 'react-native';

import CharacterDataSectionLayout from './../CharacterDataSectionLayout';
import {ICommonRank} from '../../interfaces/BuildsInterface';

type Props = {
  weapons: ICommonRank[];
};

export default function CharacterWeapons({weapons}: Props) {
  return (
    <CharacterDataSectionLayout bgColor="#1d1d1d" title="Weapons">
      <View>
        {weapons.map((weapon, index) => (
          <View
            className="w-full flex flex-row items-start justify-start"
            key={index}>
            <Text className="text-white text-lg mr-2">
              {index !== 0 && weapon.rank === weapons[index - 1].rank
                ? '~='
                : weapon.rank + `.`}
            </Text>
            <Text className="text-white text-lg">
              {weapon.name}
              {weapon.hasNote && <Text className="text-white text-lg"> *</Text>}
            </Text>
          </View>
        ))}
      </View>
    </CharacterDataSectionLayout>
  );
}
