// HomeScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import EventCard from './EventCard';

import { COLORS } from '../../assets/colors';

const HomeScreen = () => {
    const [events, setEvents] = useState([
        { id: 1, eventName: 'Event 1', date: '2024-03-15', location: 'Venue 1' },
        { id: 2, eventName: 'Event 2', date: '2024-03-20', location: 'Venue 2' },
        { id: 3, eventName: 'Event 3', date: '2024-03-25', location: 'Venue 3' },
        { id: 4, eventName: 'Event 4', date: '2024-03-30', location: 'Venue 4' },
        { id: 5, eventName: 'Event 5', date: '2024-04-05', location: 'Venue 5' },
        { id: 6, eventName: 'Event 6', date: '2024-04-10', location: 'Venue 6' },
        { id: 7, eventName: 'Event 7', date: '2024-04-15', location: 'Venue 7' },
        { id: 8, eventName: 'Event 8', date: '2024-04-16', location: 'Venue 8' },
        
        // Add more events as needed
    ]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Home Screen!</Text>
            <FlatList
                data={events}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <EventCard
                        eventName={item.eventName}
                        date={item.date}
                        location={item.location}
                    />
                )}
                showsVerticalScrollIndicator={false}
                style={{ width: '100%' }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.lightblack
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: "#FFF"
    },
});

export default HomeScreen;
