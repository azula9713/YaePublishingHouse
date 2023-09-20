import {View, Image} from 'react-native';
import {useRecoilState} from 'recoil';

import ElementalImagePicker from '../utils/ElementImagePicker';
import {selectedElementAtom} from '../atoms/CommonAtoms';

function ElementalPicker() {
  const ELEMENTS = [
    'Anemo',
    'Cryo',
    'Dendro',
    'Electro',
    'Geo',
    'Hydro',
    'Pyro',
  ];

  const [selectedElement, setSelectedElement] =
    useRecoilState(selectedElementAtom);

  return (
    <View className="flex flex-row flex-wrap justify-center">
      {ELEMENTS.map(element => {
        return (
          <View
            className="flex flex-col items-center justify-center p-2"
            key={element}>
            <View
              className="w-8 h-8 rounded-full mt-4"
              onTouchEnd={() =>
                //if clicked element is already selected, set element to all
                selectedElement === element
                  ? setSelectedElement('All')
                  : setSelectedElement(element)
              }>
              <Image
                source={ElementalImagePicker(element)}
                style={{
                  width: 32,
                  height: 32,
                  resizeMode: 'contain',
                  opacity:
                    selectedElement === element || selectedElement === 'All'
                      ? 1
                      : 0.6,
                }}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}

export default ElementalPicker;
