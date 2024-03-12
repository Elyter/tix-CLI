// EventCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EventCard = ({ eventName, date, location }) => {
    return (
        <View style={styles.card}>
            <image source={require('../assets/EventCard.png')} />
            <Text style={styles.eventName}>{eventName}</Text>
            <Text>Date: {date}</Text>
            <Text>Location: {location}</Text>
            {/* Add any other event details you want to display */}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 16,
        margin: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    eventName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});

export default EventCard;