import React from 'react';
import {View, Text} from 'react-native';

import CharacterDataSectionLayout from './../CharacterDataSectionLayout';

type Props = {
  weaponNotes?: {
    name: string;
    notes: string;
  }[];
  artifactNotes?: {
    name: string;
    notes: string;
  }[];
};

export default function SpecialNotes({weaponNotes, artifactNotes}: Props) {
  return (
    <CharacterDataSectionLayout bgColor="#1d1d1d" title="Special Notes">
      <View className="w-full flex flex-row items-start justify-start">
        {/* weapon notes */}
        <View className="w-full flex flex-col items-start justify-start">
          {weaponNotes && weaponNotes?.length > 0 && (
            <View className="w-full flex  items-start justify-start">
              <Text className="font-bold text-white text-xl mt-2">
                Regarding Weapon Choices:
              </Text>
              <View className="w-full flex flex-col items-start justify-start mt-1">
                {weaponNotes?.map((weaponNote, index) => (
                  <View
                    className="w-full flex items-start justify-start my-2"
                    key={index}>
                    <Text className="text-white text-lg mr-2 text-center font-semibold">
                      {weaponNote.name}:
                    </Text>
                    <Text className="text-white text-lg">
                      {weaponNote.notes}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          {artifactNotes && artifactNotes?.length > 0 && (
            <View className="w-full flex flex-col items-start justify-start">
              <Text className="font-bold text-white text-xl mt-2">
                Regarding Artifact Choices:
              </Text>
              <View className="w-full flex flex-col items-start justify-start mt-1">
                {artifactNotes?.map((artifactNote, index) => (
                  <View
                    className="w-full flex items-start justify-start my-2"
                    key={index}>
                    <Text className="text-white text-lg mr-2 text-center font-semibold">
                      {artifactNote.name}:
                    </Text>
                    <Text className="text-white text-lg">
                      {artifactNote.notes}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </View>
    </CharacterDataSectionLayout>
  );
}
