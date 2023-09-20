import Server from './Server';

async function fetchGenshinProfile(genshinUid: string) {
  if (genshinUid !== '') {
    const response = await Server.get(`/enkaProfile/${genshinUid}`);

    const data = {
      uid: genshinUid,
      nickname: response.data.nickname,
      signature: response.data.signature,
      profilePicture: {
        id: response.data.profilePicture.id,
        name: response.data.profilePicture.name,
        url: response.data.profilePicture.url,
      },
      profileCard: {
        id: response.data.profileCard.id,
        name: response.data.profileCard.name,
        url: response.data.profileCard.url,
      },
    };

    return data;

    // setUserData(data);

    // await AsyncStorage.setItem('user', JSON.stringify(data));
  } else {
    return {
      uid: '',
      nickname: '',
      signature: '',
      profilePicture: {
        id: '',
        name: '',
        url: '',
      },
      profileCard: {
        id: '',
        name: '',
        url: '',
      },
    };
  }
}

export {fetchGenshinProfile};
