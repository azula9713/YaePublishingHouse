import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

type Props = {
  title: string;
  children: React.ReactNode;
  icon?: string;
  iconFunction?: () => void;
};

export default function SettingSection({
  title,
  children,
  icon,
  iconFunction,
}: Props) {
  return (
    <View className="flex flex-col items-start justify-start mt-2 mb-1 rounded-lg w-full py-2 px-2 ">
      <View className="w-full flex flex-row items-center justify-between">
        <Text className="text-white text-2xl font-bold">{title}</Text>
        {icon && (
          <View className="flex flex-row items-center justify-start mt-2">
            <Icon
              name={icon}
              size={20}
              color="#fff"
              onPress={() => {
                if (iconFunction) {
                  iconFunction();
                }
              }}
            />
          </View>
        )}
      </View>
      {children}
    </View>
  );
}
