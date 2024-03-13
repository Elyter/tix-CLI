import { createStackNavigator } from '@react-navigation/stack';

import AccountScreen from '../screens/AccountScreens/AccountScreen.js';
import LoginScreen from '../screens/AccountScreens/LoginScreen.js';
import RegisterScreen from '../screens/AccountScreens/RegisterScreen.js';

const Stack = createStackNavigator();

export default function AccountNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={AccountScreen} options={{
        headerShown: false
      }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{
        headerShown: false
      }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{
        headerShown: false
      }} />
    </Stack.Navigator>
  );
}