import 'react-native-gesture-handler';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Entypo, FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID, FIREBASE_MEASUREMENT_ID } from '@env';


import HomeNav from './navigators/HomeNav';
import ResearchNav from './navigators/ResearchNav';
import TicketsNav from './navigators/TicketsNav.js';
import FavoritesNav from './navigators/FavoritesNav';
import AccountNav from './navigators/AccountNav';

import { COLORS } from './assets/colors.js'; 

const Tab = createBottomTabNavigator();

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);


const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export default function App() {
  return (
    <NavigationContainer>
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
          name="HomeNav"
          component={HomeNav}
          options={{
            headerShown: false,
            tabBarIcon: ({size, color}) => (
              <Entypo name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="ResearchNav"
          component={ResearchNav}
          options={{
            headerShown: false,
            tabBarIcon: ({size, color}) => (
              <FontAwesome name="search" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="TicketsNav"
          component={TicketsNav}
          options={{
            headerShown: false,
            tabBarIcon: ({size, color}) => (
              <FontAwesome6 name="ticket" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="FavoritesNav"
          component={FavoritesNav}
          options={{
            headerShown: false,
            tabBarIcon: ({size, color}) => (
              <FontAwesome name="heart" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="AccountNav"
          component={AccountNav}
          options={{
            headerShown: false,
            tabBarIcon: ({size, color}) => (
              <FontAwesome name="user" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
