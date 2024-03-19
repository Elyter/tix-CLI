import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../assets/colors';
import FollowButton from './FollowButton'; // Importez le composant FollowButton

const OrganizerCard = ({ name, image, isFollowing, onFollowToggle }) => {
    return (
        <View style={styles.card}>
            <Image source={image} style={styles.profileImage} />
            <Text style={styles.name}>{name}</Text>
            <FollowButton isFollowing={isFollowing} onPress={onFollowToggle} />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.darkblack,
        borderRadius: 10,
        padding: 20,
        marginRight: 5,
        marginLeft: 5,
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: COLORS.white,
    },
});

export default OrganizerCard;
