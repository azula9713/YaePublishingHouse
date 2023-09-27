import React from 'react';
import {View, Text} from 'react-native';

import CharacterDataSectionLayout from './../CharacterDataSectionLayout';
import {ICommonRank} from '../../interfaces/BuildsInterface';

type Props = {
  artifacts: ICommonRank[];
};

export default function CharacterArtifacts({artifacts}: Props) {
  return (
    <CharacterDataSectionLayout bgColor="#1d1d1d" title="Artifacts">
      <View>
        {artifacts.map((artifact, index) => (
          <View
            className="w-full flex flex-row items-start justify-start"
            key={index}>
            <Text className="text-white text-lg mr-2">
              {index !== 0 && artifact.rank === artifacts[index - 1].rank
                ? '~='
                : artifact.rank + `.`}
            </Text>
            <Text className="text-white text-lg max-w-[75%]">
              {artifact.name}
              {artifact.hasNote && (
                <Text className="text-white text-lg"> *</Text>
              )}
            </Text>
          </View>
        ))}
      </View>
    </CharacterDataSectionLayout>
  );
}
