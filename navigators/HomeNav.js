import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreens/HomeScreen';

const Stack = createStackNavigator();

export default function HomeNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{
        headerShown: false
      }}/>
    </Stack.Navigator>
  );
}