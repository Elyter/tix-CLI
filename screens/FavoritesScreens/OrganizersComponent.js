import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../../assets/colors';
const OrganizersComponent = ({ organizer, isFollowing, onFollowToggle }) => {
    return (
        <View style={styles.container}>
            <Image source={organizer.profilePicture } style={styles.profileImage} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{organizer.name}</Text>
                <TouchableOpacity
                    style={[styles.followButton, { backgroundColor: isFollowing ? COLORS.grey : COLORS.blue }]}
                    onPress={onFollowToggle}
                >
                    <Text style={styles.followButtonText}>{isFollowing ? 'Abonné(e)' : 'S\'abonner'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
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
        borderRadius: 25,
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
    },
    followButton: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
    },
    followButtonText: {
        color: COLORS.white,
        fontWeight: 'bold',
    },
});

export default OrganizersComponent;
