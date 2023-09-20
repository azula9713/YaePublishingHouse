import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  roles: string[];
  selectedRole: string;
  setSelectedRole: (role: string) => void;
};

export default function CharacterRolePicker({
  roles,
  selectedRole,
  setSelectedRole,
}: Props) {
  return (
    <View className="w-1/3 flex items-end justify-start">
      {roles.map(role => (
        <TouchableOpacity
          key={role}
          className="p-4 border flex items-center"
          onPress={() => setSelectedRole(role)}>
          <View className="flex flex-row items-center justify-center">
            <Text
              className={`${
                selectedRole === role
                  ? 'text-white font-bold text-lg'
                  : 'text-gray-500'
              } mr-2 uppercase`}>
              {role}
            </Text>
            {selectedRole === role && <Icon name="check-circle" />}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
