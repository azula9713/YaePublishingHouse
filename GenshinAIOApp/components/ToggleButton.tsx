import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

type Props = {
  btnIcon: string;

  btnAction: () => void;
  isActivated?: boolean;
};

export default function ToggleButton({btnIcon, isActivated, btnAction}: Props) {
  return (
    <TouchableOpacity
      className={`${
        isActivated ? 'bg-purple-600 opacity-100' : 'bg-purple-400 opacity-50'
      } rounded-lg p-1 m-1`}
      onPress={btnAction}>
      {/* <Text className="text-white text-lg">{btnText}</Text> */}
      <Icon name={btnIcon} size={30} color="white" />
    </TouchableOpacity>
  );
}
