import { createStackNavigator } from '@react-navigation/stack';

import AccountScreen from '../screens/AccountScreens/AccountScreen.js';

const Stack = createStackNavigator();

export default function AccountNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={AccountScreen} options={{
        headerShown: false
      }} />
    </Stack.Navigator>
  );
}