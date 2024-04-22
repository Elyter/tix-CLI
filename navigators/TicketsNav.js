import { createStackNavigator } from '@react-navigation/stack';
import TicketsScreen from '../screens/TicketsScreens/TicketsScreen';

const Stack = createStackNavigator();

export default function TicketsNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Pour cacher le header
      }}
    >
      <Stack.Screen name="Tickets" component={TicketsScreen} />
    </Stack.Navigator>
  );
}
