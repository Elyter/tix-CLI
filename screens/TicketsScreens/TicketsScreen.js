import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TicketsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Tickets Screen !</Text>
            {/* Add your content here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default TicketsScreen;