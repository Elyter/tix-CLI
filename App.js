import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';


import HomeNav from './navigators/HomeNav';
import ResearchNav from './navigators/ResearchNav';
import TicketsNav from './navigators/TicketsNav';
import FavoritesNav from './navigators/FavoritesNav';
import AccountNav from './navigators/AccountNav';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#FF9800',
          tabBarInactiveTintColor: '#757575',
        }}
      >
        <Tab.Screen
          name="HomeNav"
          component={HomeNav}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Feather name="home" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="ResearchNav"
          component={ResearchNav}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="TicketsNav"
          component={TicketsNav}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="FavoritesNav"
          component={FavoritesNav}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="AccountNav"
          component={AccountNav}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
