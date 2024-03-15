// EventCard.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../../assets/colors';

const EventCard = ({ eventName, date, location }) => {
    return (
        <View style={styles.card}>
            <Image
                source={require('../../assets/EventImage.jpg')} //             
                style={styles.eventImage} // Ajoute un style pour l'image si nécessaire
            />
            <View style={styles.content}>
                <Text style={styles.eventName}>{eventName}</Text>
                <Text style={styles.text}>Date: {date}</Text>
                <Text style={styles.text}>Location: {location}</Text>
                {/* Add any other event details you want to display */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.darkblack,
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
    eventImage: {
        width: '100%', // Ajuste la largeur comme nécessaire
        height: 200, // Ajuste la hauteur comme nécessaire
        borderRadius: 8,
        marginBottom: 8,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    eventName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'white',
    },
    text: {
        color: 'white',
    },
});

export default EventCard;
