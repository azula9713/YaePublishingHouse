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

type DetailsRouteProp = RouteProp<RootStackParams, 'Details'>;

type Props = {
  route: DetailsRouteProp;
};

export default function Details({route}: Props) {
  const basicCharacterInfo: IBaseCharacter = route.params.character;

  const mainStats = [
    {
      slot: 'Sands',
      stats: 'ATK%',
    },
    {
      slot: 'Goblet',
      stats: 'Anemo DMG',
    },
    {
      slot: 'Circlet',
      stats: 'CRIT DMG / CRIT Rate',
    },
  ];

  const subStats = [
    {stats: ['Crit Rate', 'Crit Damage'], rank: 1},
    {stats: ['ATK%'], rank: 2},
    {stats: ['Energy Recharge'], rank: 3},
    {stats: ['EM'], rank: 4},
  ];

  const talentPriority = {
    talents: [
      {
        name: 'Skill',
        rank: 1,
      },
      {
        name: 'Normal Attack',
        rank: 2,
      },
      {
        name: 'Burst',
        rank: 3,
      },
    ],
    notes: '',
  };

  const specialNotes = {
    weaponNotes: [
      {
        name: 'Lost Prayer to the Sacred Winds',
        notes:
          'In teams where Shikanoin Heizou and Bennett are used in the same team, this weapon is better than Skyward Atlas.',
      },
      {
        name: 'The Widsith',
        notes:
          'The Widsith provides the highest possible critical hit single strike damage for Heizou. However, its long cooldown leads it to lack consistency, and it has a chance of obtaining the relatively useless EM buff for Anemo DPS Heizou.',
      },
    ],
    artifactNotes: [
      {
        name: 'Viridescent Venerer (4)',
        notes:
          "This is both Shikanoin Heizou's best personal damage set, and his best set for supporting the team.",
      },
    ],
  };

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
        <View className="w-full flex flex-row items-center justify-between">
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
              role={selectedRole}
              roleDescription={selectedBuild.description}
            />
            <CharacterWeapons weapons={selectedBuild.weapons} />
            <CharacterArtifacts artifacts={selectedBuild.artifacts} />
            <MainStats mainStats={selectedBuild.mainStats} />
            <SubStats subStats={selectedBuild.subStats} />
            <TalenPriority talents={selectedBuild.talentPriority} />
            <SpecialNotes
              weaponNotes={selectedBuild.specialNotes.weaponNotes}
              artifactNotes={selectedBuild.specialNotes.artifactNotes}
            />
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
