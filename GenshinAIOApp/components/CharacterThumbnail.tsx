import React from 'react';
import {Image, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';

import colorFilter, {bgColorFilter} from '../utils/ThumbnailColourFilter';
import {IBaseCharacter} from '../interfaces/CharacterInterface';

type Props = {
  character: IBaseCharacter;
  onPress: () => void;
};

export default function CharacterThumbnail({character, onPress}: Props) {
  const {
    toColor: bgTo,
    fromColor: bgFrom,
    viaColor: bgVia,
  } = colorFilter[character.rarity];

  return (
    <View
      className="mx-2 relative rounded-xl shadow-lg drop-shadow-md shadow-[#323333] overflow-hidden mb-5 border-2 border-white h-[190px] w-[29%]"
      style={{
        backgroundColor: bgColorFilter[character.rarity],
      }}>
      <TouchableOpacity onPress={onPress} className="h-full w-full">
        <LinearGradient className="h-full" colors={[bgTo, bgVia, bgFrom]}>
          <Image
            source={{
              uri: character.iconUrl,
            }}
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
          />
          <View className="absolute bottom-0 left-0 right-0 flex items-center justify-center h-[20%]">
            <Text
              className={`text-white text-center font-bold shadow-md ${
                character.name.length > 12 ? 'text-xs' : 'text-sm'
              }`}>
              {character.isTraveler
                ? `${character.element.name} Traveler`
                : character.name}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
