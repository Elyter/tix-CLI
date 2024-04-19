import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../assets/colors';

const EventDetails = ({ route }) => {
    // Récupérer les paramètres de navigation
    const { eventName, date, location, price, organizer } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{eventName}</Text>
            <Text style={styles.subtitle}>{organizer}</Text>
            <Text style={styles.info}>{date}</Text>
            <Text style={styles.info}>{location}</Text>
            <Text style={styles.info}>{price}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightblack,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.white,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: COLORS.grey,
        marginBottom: 10,
    },
    info: {
        fontSize: 16,
        color: COLORS.white,
        marginBottom: 5,
    },
});

export default EventDetails;
