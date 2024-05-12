import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../assets/colors';
import FollowButton from './FollowButton'; // Importez le composant FollowButton
import { Image } from 'expo-image';
import { API_URL } from '@env';

const OrganizersComponent = ({ organizer, isFollowing, onFollowToggle }) => {
    return (
        <View style={styles.container}>
            <Image source={API_URL + "/images/organizers/" + organizer.pp } style={styles.profileImage} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{organizer.name}</Text>
                <FollowButton isFollowing={isFollowing} onPress={onFollowToggle} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: COLORS.lightblack,
        padding: 10,
        marginVertical: 5,
        shadowColor: COLORS.darkblack,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 40,
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.white,
    },
});

export default OrganizersComponent;
