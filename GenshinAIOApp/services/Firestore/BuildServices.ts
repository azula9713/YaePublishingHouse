import firestore from '@react-native-firebase/firestore';
import {ToastAndroid} from 'react-native';

import {IBuild} from '../../interfaces/BuildsInterface';

async function getCharacterBuilds(characterId: number) {
  console.log('characterId: ', characterId);
  const buildsRef = firestore().collection('builds');

  const buildsQuery = await buildsRef
    .where('characterId', '==', characterId)
    .get();

  if (buildsQuery.empty) {
    ToastAndroid.show('No builds found', ToastAndroid.LONG);
    return [];
  } else {
    ToastAndroid.show('Builds found', ToastAndroid.LONG);
    return buildsQuery.docs.map(buildDoc => buildDoc.data() as IBuild);
  }
}

export default getCharacterBuilds;
