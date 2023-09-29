import React from 'react';
import {View} from 'react-native';

import EnergryRechargeIcon from '../../assets/images/attributes/Icon_Attribute_Energy_Recharge.png';
import AttackIcon from '../../assets/images/attributes/Icon_Attribute_Attack.png';
import CritIcon from '../../assets/images/attributes/Icon_Attribute_Critical_Hit.png';
import DefIcon from '../../assets/images/attributes/Icon_Attribute_Defense.png';
import HpIcon from '../../assets/images/attributes/Icon_Attribute_Health.png';
import ElementalMasteryIcon from '../../assets/images/attributes/Icon_Attribute_Elemental_Mastery.png';

import CharacterDataSectionLayout from './../CharacterDataSectionLayout';
import SubStatItems from './SubStatItems';

type Props = {
  subStats: {
    stats: string[];
    rank: number;
  }[];
};

export default function SubStats({subStats}: Props) {
  return (
    <CharacterDataSectionLayout bgColor="#1d1d1d" title="Sub Stats">
      <View className="flex flex-row flex-wrap">
        {subStats.map((subStat, index) => (
          <View
            className="w-full flex flex-row items-center justify-start"
            key={index}>
            {subStat.stats.map((stat, index) => (
              <View
                className="w-max flex flex-row items-center justify-start"
                key={index}>
                {stat.includes('Energy Recharge') && (
                  <SubStatItems stat={stat} icon={EnergryRechargeIcon} />
                )}
                {stat.includes('ATK') && (
                  <SubStatItems stat={stat} icon={AttackIcon} />
                )}
                {stat.includes('Crit') && (
                  <SubStatItems stat={stat} icon={CritIcon} />
                )}
                {stat.includes('DEF') && (
                  <SubStatItems stat={stat} icon={DefIcon} />
                )}
                {stat.includes('HP') && (
                  <SubStatItems stat={stat} icon={HpIcon} />
                )}
                {stat.includes('Elemental Mastery') && (
                  <SubStatItems stat={stat} icon={ElementalMasteryIcon} />
                )}
              </View>
            ))}
          </View>
        ))}
      </View>
    </CharacterDataSectionLayout>
  );
}
