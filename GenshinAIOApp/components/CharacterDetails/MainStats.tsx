import React from 'react';
import {Image, Text, View} from 'react-native';

import SandsIcon from '../../assets/images/artifactslots/Icon_Sands_of_Eon.png';
import GobletIcon from '../../assets/images/artifactslots/Icon_Goblet_of_Eonothem.png';
import CircletIcon from '../../assets/images/artifactslots/Icon_Circlet_of_Logos.png';

import CharacterDataSectionLayout from './../CharacterDataSectionLayout';
import MainStatItem from './MainStatItem';

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
          <View className="w-max flex items-start justify-center" key={index}>
            <View className="w-full h-12 mr-2">
              {mainStat.slot === 'Sands' && (
                //
                <MainStatItem name="Sands of Eon" icon={SandsIcon} />
              )}
              {mainStat.slot === 'Goblet' && (
                <MainStatItem name="Goblet of Eonothem" icon={GobletIcon} />
              )}

              {mainStat.slot === 'Circlet' && (
                <MainStatItem name="Circlet of Logos" icon={CircletIcon} />
              )}
            </View>
            <Text className="text-white text-lg mx-4 my-2">
              {mainStat.stats}
            </Text>
          </View>
        ))}
      </View>
    </CharacterDataSectionLayout>
  );
}
