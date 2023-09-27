import React, {useEffect, useState} from 'react';
import {Text, View, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilValue} from 'recoil';
import {StackNavigationProp} from '@react-navigation/stack';
import Animated from 'react-native-reanimated';

import ElementalPicker from '../components/ElementalPicker';
import WideThumbnail from '../components/WideThumbnail';
import ToggleButton from '../components/ToggleButton';
import CharacterThumbnail from '../components/CharacterThumbnail';
import Server from '../services/Server';
import {IBaseCharacter} from '../interfaces/CharacterInterface';
import {filterCharactersByElement} from '../utils/FilterAllCharacters';
import {selectedElementAtom} from '../atoms/CommonAtoms';
import {RootStackParams} from '../navigation/RootStackParams';

import ENLang from '../static/messages.EN.json';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParams, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

function Characters({navigation}: Props) {
  const [allCharacters, setAllCharacters] = useState([]);
  const [elementalCharacters, setElementalCharacters] = useState([]);
  const selectedElement = useRecoilValue(selectedElementAtom);
  const [selectedView, setSelectedView] = useState('list'); // ['list', 'grid'

  async function getAllCharacters() {
    await Server.get('/enkaCharacters/all')
      .then(res => {
        setAllCharacters(res.data);
      })
      .catch(() => {
        ToastAndroid.show(ENLang.errorFetchingCharacters, ToastAndroid.LONG);
      });
  }

  async function toggleView(view: 'list' | 'grid') {
    setSelectedView(view);
    //set selectedview localstorage to persist
    await AsyncStorage.setItem('selectedView', view);
  }

  useEffect(() => {
    getAllCharacters();

    //get selected view from localstorage
    AsyncStorage.getItem('selectedView').then(res => {
      if (res) {
        setSelectedView(res);
      }
    });
  }, []);

  useEffect(() => {
    let filteredCharacters = [];

    filteredCharacters = filterCharactersByElement(
      allCharacters,
      selectedElement,
    ) as [];

    setElementalCharacters(filteredCharacters);
  }, [selectedElement, allCharacters]);

  return (
    <View className="bg-black h-full flex items-center justify-start px-4 pt-4">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-2xl font-bold text-white w-3/4">Characters</Text>
        {/* create two buttons with icons to toggle between list view and detail view */}
        <View className="flex flex-row items-center justify-end w-1/4">
          <ToggleButton
            btnIcon="list"
            isActivated={selectedView === 'list'}
            btnAction={() => toggleView('list')}
          />
          <ToggleButton
            btnIcon="grid"
            isActivated={selectedView === 'grid'}
            btnAction={() => toggleView('grid')}
          />
        </View>
      </View>
      <ElementalPicker />

      {/* //one flatlist with dynamic rendering based on selectedView */}
      <Animated.FlatList
        style={{width: '100%', height: '100%'}}
        data={elementalCharacters}
        renderItem={({item}) =>
          selectedView === 'list' ? (
            <WideThumbnail
              character={item}
              onPress={() => {
                navigation.navigate('Details', {
                  character: item,
                });
              }}
            />
          ) : (
            <CharacterThumbnail
              character={item}
              onPress={() => {
                navigation.navigate('Details', {
                  character: item,
                });
              }}
            />
          )
        }
        //add animation to flatlist
        numColumns={selectedView === 'list' ? 1 : 3}
        keyExtractor={(item: IBaseCharacter) => item.id}
        key={selectedView}
        className="w-full mt-4"
      />
    </View>
  );
}

export default Characters;
