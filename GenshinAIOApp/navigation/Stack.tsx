import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import CharacterBuilds from '../screens/CharacterBuilds';
import Details from '../screens/Details';
import {RootStackParams} from './RootStackParams';

const Stack = createStackNavigator<RootStackParams>();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={CharacterBuilds}
        options={() => ({
          headerShown: false,
          animationEnabled: true,
          animationTypeForReplace: 'push',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={({route}) => ({
          title: route.params.character.name,
          headerStyle: {
            backgroundColor: '#202020',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          animationEnabled: true,
          animationTypeForReplace: 'push',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      />
    </Stack.Navigator>
  );
}
