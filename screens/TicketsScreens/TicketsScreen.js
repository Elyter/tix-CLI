import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../assets/colors';

const Tab = createMaterialTopTabNavigator();

const TicketsScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader title="MyTix" />
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: { fontSize: 14, fontWeight: 'bold'},
          style: { backgroundColor: COLORS.darkblack, height: 50},
          indicatorStyle: { backgroundColor: COLORS.orange },
          activeTintColor: COLORS.orange,
          inactiveTintColor: COLORS.grey,
        }}>
          
        <Tab.Screen
          name="Upcoming"
          component={UpcomingTicketsScreen}
          options={{ tabBarLabel: 'À venir' }}
        />
        <Tab.Screen
          name="Past"
          component={PastTicketsScreen}
          options={{ tabBarLabel: 'Passés' }}
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

const UpcomingTicketsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Billets à venir</Text>
      {/* Contenu de la section "Billets à venir" */}
    </View>
  );
};

const PastTicketsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Billets passés</Text>
      {/* Contenu de la section "Billets passés" */}
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

export default TicketsScreen;
