import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../assets/colors';
import HeartButton from './HeartButton'; // Importez le composant HeartButton

const EventCard = ({ eventName, date, location, eventImage, price, organizer }) => {
    return (
        <TouchableOpacity style={[styles.card, styles.container]}>
            <Image
                source={eventImage}
                style={styles.eventImage}
            />
            <View style={styles.content}>
                <Text style={styles.eventName}>{eventName}</Text>
                <Text style={styles.organizer}>{organizer}</Text>
                <Text style={styles.date}>{date}</Text>
                <Text style={styles.location}>{location}</Text>
                <Text style={styles.price}>{price}</Text>
                <View style={styles.buttonContainer}>
                    <HeartButton isLiked={false} onPress={() => console.log('Like pressed')} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.darkblack,
        padding: 16,
        margin: 8,
        borderRadius: 8,
        shadowColor: COLORS.darkblack,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    container: {
        minHeight: 300, // Définissez une hauteur minimale pour la carte
    },
    eventImage: {
        width: '100%',
        height: 210,
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
        color: COLORS.white,
    },
    location: {
        color: COLORS.white,
        fontWeight: '700',
    },
    date: {
        color: COLORS.white,
        fontWeight: '700',
    },
    price: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    organizer: {
        color: COLORS.grey,
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 85,
        right: 0,
        backgroundColor: COLORS.darkblack,
        padding: 9,
        borderRadius: 100,
        marginRight: 16,
        marginBottom: 16,

    },
});

export default EventCard;
