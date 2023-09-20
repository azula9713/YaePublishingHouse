import {Text} from 'react-native';

import CharacterDataSectionLayout from './../CharacterDataSectionLayout';

type Props = {
  role: string;
  roleDescription: string;
};

export default function RoleSummary({role, roleDescription}: Props) {
  return (
    <CharacterDataSectionLayout bgColor="#25995f" title={role}>
      <Text className="text-lg text-white leading-5 text-left">
        {roleDescription}
      </Text>
    </CharacterDataSectionLayout>
  );
}
