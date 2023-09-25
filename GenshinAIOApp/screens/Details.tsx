import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';

import CharacterRolePicker from '../components/CharacterDetails/CharacterRolePicker';
import RoleSummary from '../components/CharacterDetails/RoleSummary';
import CharacterWeapons from '../components/CharacterDetails/CharacterWeapons';
import CharacterArtifacts from '../components/CharacterDetails/CharacterArtifacts';
import MainStats from '../components/CharacterDetails/MainStats';
import SubStats from '../components/CharacterDetails/SubStats';
import TalenPriority from '../components/CharacterDetails/TalenPriority';
import SpecialNotes from '../components/CharacterDetails/SpecialNotes';
import {RootStackParams} from '../navigation/RootStackParams';
import {IBaseCharacter} from '../interfaces/CharacterInterface';
import {IBuild} from '../interfaces/BuildsInterface';
import getCharacterBuilds from '../services/Firestore/BuildServices';
import elementColorPicker from '../utils/ElementColorPicker';

type DetailsRouteProp = RouteProp<RootStackParams, 'Details'>;

type Props = {
  route: DetailsRouteProp;
};

export default function Details({route}: Props) {
  const basicCharacterInfo: IBaseCharacter = route.params.character;

  const [selectedRole, setSelectedRole] = useState('');
  const [characterBuilds, setCharacterBuilds] = useState<IBuild[]>([]);
  const [selectedBuild, setSelectedBuild] = useState<IBuild>({} as IBuild);

  useEffect(() => {
    const getBuilds = async () => {
      const builds = await getCharacterBuilds(
        Number(basicCharacterInfo.enkaId),
      );

      if (builds.length === 0) return;

      setCharacterBuilds(builds);
      setSelectedRole(builds[0].roleName);
      setSelectedBuild(builds[0]);
    };

    getBuilds();
  }, []);

  useEffect(() => {
    if (characterBuilds.length === 0) return;

    const getSelectedBuild = () => {
      const returnBuild = characterBuilds.filter(
        build => build.roleName === selectedRole,
      )[0];

      setSelectedBuild(returnBuild);
    };

    getSelectedBuild();
  }, [selectedRole, characterBuilds]);

  if (selectedBuild?.roleName) {
    return (
      <View className="w-full flex items-center justify-start bg-black h-full">
        <View className="w-full flex flex-row items-center justify-between py-2">
          <Image
            source={{uri: basicCharacterInfo.splashUrl}}
            style={{
              width: 300,
              height: 250,
              resizeMode: 'cover',
            }}
            className="w-full"
          />
          <View className="w-full">
            <CharacterRolePicker
              roles={characterBuilds.map(build => build.roleName)}
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
            />
          </View>
        </View>

        <ScrollView className="h-full">
          <View className="w-full flex items-start justify-start py-2 px-4 h-full">
            <RoleSummary
              bgColor={elementColorPicker(basicCharacterInfo.element.name)}
              role={selectedRole}
              roleDescription={selectedBuild.description}
            />
            <CharacterWeapons weapons={selectedBuild.weapons} />
            <CharacterArtifacts artifacts={selectedBuild.artifacts} />
            <MainStats mainStats={selectedBuild.mainStats} />
            <SubStats subStats={selectedBuild.subStats} />
            <TalenPriority talents={selectedBuild.talentPriority} />
            {selectedBuild?.specialNotes?.weaponNotes.length > 0 ||
            selectedBuild?.specialNotes?.artifactNotes.length > 0 ? (
              <SpecialNotes
                weaponNotes={selectedBuild.specialNotes.weaponNotes}
                artifactNotes={selectedBuild.specialNotes.artifactNotes}
              />
            ) : null}
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View className="w-full flex items-center justify-center bg-black h-full">
      <Image
        source={{uri: basicCharacterInfo.splashUrl}}
        style={{
          width: 300,
          height: 250,
          resizeMode: 'cover',
        }}
        className="w-full"
      />

      <Text>
        There are no builds for this character yet. Please check back later!
      </Text>
    </View>
  );
}
