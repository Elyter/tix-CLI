import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../assets/colors';

const EventsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Événements</Text>
            {/* Contenu spécifique à l'onglet Événements */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.lightblack, // Fond noir
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default EventsScreen;
