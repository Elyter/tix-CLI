import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { COLORS } from '../../assets/colors';
import OrganizersComponent from './OrganizersComponent';

// Exemple de données d'organisateurs
const organizersData = [
    {
        id: 1,
        name: 'Tyla',
        profilePicture: require('../../assets/images/tyla.jpg'),
        isFollowing: false,
    },
    {
        id: 2,
        name: 'mari de tyla',
        profilePicture: require('../../assets/images/salim.jpg'),
        isFollowing: true,
    },
    { 
        id: 3,
        name: 'djidji',
        profilePicture: require('../../assets/images/djidji.jpg'),
        isFollowing: false,
    },

    // Ajoutez d'autres organisateurs selon vos besoins
];

const OrganizersScreen = () => {
    // Définir l'état des organisateurs
    const [organizers, setOrganizers] = useState(organizersData);

    // Fonction pour basculer l'état d'abonnement
    const handleFollowToggle = (id) => {
        setOrganizers(prevOrganizers => (
            prevOrganizers.map(organizer => {
                if (organizer.id === id) {
                    return { ...organizer, isFollowing: !organizer.isFollowing };
                }
                return organizer;
            })
        ));
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={organizers}
                renderItem={({ item }) => (
                    <OrganizersComponent
                        organizer={item}
                        isFollowing={item.isFollowing}
                        onFollowToggle={() => handleFollowToggle(item.id)}
                    />
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightblack, 
    },
});

export default OrganizersScreen;
