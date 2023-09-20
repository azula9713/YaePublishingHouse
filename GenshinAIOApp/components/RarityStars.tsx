import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  rarity: 'QUALITY_PURPLE' | 'QUALITY_ORANGE' | 'QUALITY_ORANGE_SP';
};

export default function RarityStars({rarity}: Props) {
  if (rarity === 'QUALITY_ORANGE') {
    return (
      <View className="flex flex-row">
        {Array.from(Array(5).keys()).map(i => (
          <View key={i} className="mx-[2px]">
            <Icon name="star" size={20} color="gold" />
          </View>
        ))}
      </View>
    );
  }

  if (rarity === 'QUALITY_ORANGE_SP') {
    return (
      <View className="flex flex-row">
        {Array.from(Array(5).keys()).map(i => (
          <View key={i} className="mx-[2px]">
            <Icon name="star" size={20} color="orange" />
          </View>
        ))}
      </View>
    );
  }

  if (rarity === 'QUALITY_PURPLE') {
    return (
      <View className="flex flex-row">
        {Array.from(Array(4).keys()).map(i => (
          <View key={i} className="mx-[2px]">
            <Icon name="star" size={20} color="gold" />
          </View>
        ))}
      </View>
    );
  }
}
