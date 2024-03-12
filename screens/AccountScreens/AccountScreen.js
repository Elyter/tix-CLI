import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { COLORS } from '../../assets/colors';

const AccountScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>pp Section</Text>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: "#FFF"
    },
});


export default AccountScreen;
