import {useState} from 'react';
import {
  Alert,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  uid: string;
  setUid: (uid: string) => void;
  isModalVisible: boolean;
  setModalVisible: (isVisible: boolean) => void;
};

export default function EditUIDModal({
  uid,
  setUid,
  isModalVisible,
  setModalVisible,
}: Props) {
  const [updatedUid, setUpdatedUid] = useState(uid);

  function closeModal() {
    setModalVisible(!isModalVisible);
  }

  return (
    <Modal
      className=""
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        closeModal();
      }}
      //close when clicking outside of modal
      onDismiss={() => {
        closeModal();
      }}>
      <View
        className="w-screen h-screen flex flex-col items-center justify-center p-8 m-4"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <View className="bg-gray-500 w-full p-4 rounded-lg">
          <TextInput
            className="bg-gray-400 text-white text-lg font-bold px-4 py-2 rounded-lg mb-2 placeholder:bg-slate-600"
            onChangeText={setUpdatedUid}
            value={updatedUid}
            placeholder="Enter your Genshin Impact UID"
            placeholderTextColor="gray"
            keyboardType="numeric"
            maxLength={9}
          />
          <TouchableOpacity
            onPress={() => {
              setUid(updatedUid);
              setModalVisible(!isModalVisible);
            }}>
            <View className="bg-gray-700  text-lg font-bold px-4 py-2 rounded-lg">
              <Text className="text-center font-semibold text-white">
                {uid === '' ? 'Save' : uid === updatedUid ? 'Cancel' : 'Update'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
