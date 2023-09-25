import {Text} from 'react-native';

import CharacterDataSectionLayout from './../CharacterDataSectionLayout';

type Props = {
  role: string;
  roleDescription: string;
  bgColor: string;
};

export default function RoleSummary({role, roleDescription, bgColor}: Props) {
  return (
    <CharacterDataSectionLayout bgColor={bgColor} title={role}>
      <Text className="text-lg text-white leading-5 text-left">
        {roleDescription}
      </Text>
    </CharacterDataSectionLayout>
  );
}
