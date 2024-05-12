import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { COLORS } from '../../assets/colors';
import OrganizersComponent from '../../components/OrganizersComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '@env';
import { useIsFocused } from '@react-navigation/native';

// Exemple de données d'organisateurs
const organizersData = [

];

const OrganizersScreen = () => {
    // Définir l'état des organisateurs
    const [organizers, setOrganizers] = useState(organizersData);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState();

    const isFocused = useIsFocused();

    // Fonction pour basculer l'état d'abonnement
    const handleFollowToggle = async (id) => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            uid = userData.replace(/"/g, '');
            console.log(API_URL + '/follows/' + uid + "/" + id)
            axios.post(API_URL + '/follows/' + uid + "/" + id)
                .then((response) => {
                    if (response.data.message === "Follow effectué") {
                        console.log('Follow added:', response.data);
                        setLoading(true);
                        getFollow();
                    } else {
                        console.log('Follow removed:', response.data);
                        setLoading(true);
                        getFollow();
                    }
                })
                .catch((error) => {
                    console.error('Error following organizer:', error);
                });
            } catch (error) {
                console.error('Error getting async storage:', error);
            }
    };

    const getFollow = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            setUserData(userData.replace(/"/g, ''));
            const url = API_URL + "/follows/following/" + userData.replace(/"/g, '')
            axios.get(url)
                .then((response) => {
                    console.log('Following:', response.data);
                    setOrganizers(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                    console.error('Error getting following:', error);
                });
        } catch (error) {
            console.error('Error getting async storage:', error);
        }
    }

    useEffect(() => {
        setLoading(true);
        getFollow();
        setLoading(false);
    }, [isFocused]);

    const onRefresh = () => {
        setRefreshing(true);
        setLoading(true);
        getFollow();
        setTimeout(() => {
            setRefreshing(false);
            setLoading(false);
        }, 300);
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color={COLORS.orange} />
            ) : (
                <FlatList
                    data={organizers}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor={COLORS.orange}
                        />}
                    renderItem={({ item }) => (
                        <OrganizersComponent
                            organizer={item}
                            isFollowing={!item.isFollowing}
                            onFollowToggle={() => handleFollowToggle(item.id)}
                        />
                    )}
                    keyExtractor={item => item.id.toString()}
                />
            )}
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