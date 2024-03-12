import { createStackNavigator } from '@react-navigation/stack';

import TicketsScreen from '../screens/TicketsScreens/TicketsScreen';

const Stack = createStackNavigator();

export default function TicketsNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tickets" component={TicketsScreen} />
    </Stack.Navigator>
  );
}