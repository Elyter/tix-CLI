import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { COLORS } from '../../assets/colors';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Home Screen!</Text>
            {/* Add your content here */}
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