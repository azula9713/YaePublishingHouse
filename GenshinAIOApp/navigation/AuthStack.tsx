import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import Login from '../screens/Login';

const AuthStack = createStackNavigator();

export default function AuthStackNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={() => ({
          headerShown: false,
          animationEnabled: true,
          animationTypeForReplace: 'push',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      />
    </AuthStack.Navigator>
  );
}
