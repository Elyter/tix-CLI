import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddEvent from '../screens/EventForm';
import ProfileScreen from '../screens/ProfileScreen';
import MyEvents from '../screens/MyEvents';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../assets/colors.js';

const Tab = createBottomTabNavigator();

const OrganizerNav = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
          tabBarActiveTintColor: COLORS.orange,
          tabBarInactiveTintColor: COLORS.grey,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: COLORS.darkblack,
            borderTopWidth: 0.5,
            borderTopColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
      <Tab.Screen
        name="MyEvents"
        component={MyEvents}
        options={{
            tabBarIcon: ({size, color}) => (
              <AntDesign name="calendar" size={24} color={color} />
            ),
            headerShown: false,
          }}
      />
      <Tab.Screen
        name="AddEvent" 
        component={AddEvent} 
        options={{
            tabBarIcon: ({size, color}) => (
              <AntDesign name="pluscircleo" size={24} color={color} />
            ),

          }}
      />
      <Tab.Screen 
        name="profile" 
        component={ProfileScreen}
        options={{
            tabBarIcon: ({size, color}) => (
              <AntDesign name="user" size={24} color={color} />
            ),
          }}
      /> 
    </Tab.Navigator>
  );
}

export default OrganizerNav;
