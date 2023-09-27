import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import StackNavigator from './Stack';
import Profile from '../screens/Profile';

export default function Tabs() {
  const Tab = createBottomTabNavigator();

  const tabBarStyle = {
    backgroundColor: '#202020',
    borderTopWidth: 0,
    paddingBottom: 5,
    paddingTop: 5,
    height: 60,
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Characters"
        component={StackNavigator}
        options={{
          tabBarIcon: ({size, focused}) => (
            <Icon name="shield" size={size} color={focused ? '#fff' : 'gray'} />
          ),
          headerShown: false,
          tabBarStyle: tabBarStyle,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
            color: '#fff',
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({size, focused}) => (
            <Icon name="user" size={size} color={focused ? '#fff' : 'gray'} />
          ),
          headerShown: false,
          tabBarStyle: tabBarStyle,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
            color: '#fff',
          },
        }}
      />
    </Tab.Navigator>
  );
}
