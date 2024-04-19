import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../assets/colors';

const Tab = createMaterialTopTabNavigator();

const MyEventsScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader title="MyEvents" />
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: { fontSize: 14, fontWeight: 'bold'},
          style: { backgroundColor: COLORS.darkblack, height: 50},
          indicatorStyle: { backgroundColor: COLORS.orange },
          activeTintColor: COLORS.orange,
          inactiveTintColor: COLORS.grey,
        }}>
          
        <Tab.Screen
          name="All"
          component={AllEventsScreen}
          options={{ tabBarLabel: 'Tous' }}
        />
        <Tab.Screen
          name="Past"
          component={PastEventsScreen}
          options={{ tabBarLabel: 'Passés' }}
        />
        <Tab.Screen
          name="Upcoming"
          component={UpcomingEventsScreen}
          options={{ tabBarLabel: 'À venir' }}
        />
      </Tab.Navigator>
    </View>
  );
};

const CustomHeader = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const UpcomingEventsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Événements à venir</Text>
      {/* Contenu de la section "Événements à venir" */}
    </View>
  );
};

const PastEventsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Événements passés</Text>
      {/* Contenu de la section "Événements passés" */}
    </View>
  );
};

const AllEventsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tous mes événements</Text>
      {/* Contenu de la section "Tous mes événements" */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightblack,
  },
  header: {
    backgroundColor: COLORS.darkblack,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.orange,
  },
});

export default MyEventsScreen;
