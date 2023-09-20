import React, {useState, useEffect} from 'react';
import {Image, View, Text, ImageBackground} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {IBaseCharacter} from '../interfaces/CharacterInterface';
import RarityStars from './RarityStars';
import weaponIconFilter from '../utils/WeaponIconFilter';
import {getImageUrlWithFallback} from '../utils/URLChecker';

type Props = {
  character: IBaseCharacter;
  onPress: () => void;
};

export default function WideThumbnail({character, onPress}: Props) {
  const NULL_NAME_CARD =
    'https://genshindb.org/wp-content/uploads/2022/03/Battle-Pass-Namecard-Travel-Notes-Fading-Star.png';

  const [imageUrl, setImageUrl] = useState(NULL_NAME_CARD);

  useEffect(() => {
    getImageUrlWithFallback(character.nameCard, NULL_NAME_CARD).then(res => {
      setImageUrl(res);
    });
  }, [character.nameCard]);

  return (
    <ImageBackground
      className="h-28 m-1 p-2"
      imageStyle={{
        borderRadius: 10,
        resizeMode: 'cover',
        borderColor: 'gray',
        borderWidth: 2,
      }}
      style={{borderRadius: 10}}
      source={{
        // uri: character.nameCard ? character.nameCard : NULL_NAME_CARD,
        uri: imageUrl,
      }}>
      <TouchableOpacity onPress={onPress}>
        <View className="flex flex-row w-full items-center justify-between h-full">
          <View>
            <Text
              className={`text-white text-left font-bold ${
                character.name.length > 15 ? 'text-3xl' : 'text-4xl'
              }`}>
              {character.isTraveler
                ? `${character.element.name} Traveler`
                : character.name}
            </Text>
            <View className="flex flex-row items-center justify-start">
              <RarityStars rarity={character.rarity} />
              <Image
                source={weaponIconFilter[character.weaponType]}
                style={{width: 30, height: 30, tintColor: 'white'}}
              />
            </View>
          </View>

          <Image
            source={{uri: character.iconUrl}}
            style={{width: 100, height: 100}}
            loadingIndicatorSource={{uri: character.iconUrl}}
          />
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
}
