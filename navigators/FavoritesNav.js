import { createStackNavigator } from '@react-navigation/stack';

import FavoritesScreen from '../screens/FavoritesScreens/FavoritesScreen.js';

const Stack = createStackNavigator();

export default function FavoritesNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
}