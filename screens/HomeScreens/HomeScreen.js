import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'; // Importez ScrollView
import EventCard from '../../components/EventCard';
import SearchBar from '../../components/SearchBar';
import OrganizerCard from '../../components/OrganizerCard'; // Importez le composant OrganizerCard
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '@env';

import { COLORS } from '../../assets/colors';

const HomeScreen = ({navigation}) => { 
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [organizers, setOrganizers] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getEvents();
    }, [])

    const getEvents = () => {
        setLoading(true);
        const url = API_URL + '/events/';
        axios.get(url)
        .then((response) => {
            setEvents(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error getting events data:', error);
        });
        axios.get(API_URL + "/organizers/")
        .then((response) => {
            setOrganizers(response.data);
            console.log(response.data)
        })
        .catch((error) => {
            console.error('Error getting organizers data:', error);
        });
    }

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

    const onRefresh = () => {
        setRefreshing(true);
        getEvents();
        setTimeout(() => {
            setRefreshing(false);
        }, 300);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <SearchBar />
            </View>
            {/* Section: Organisateurs à suivre */}
            <ScrollView style={styles.container} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor={COLORS.orange}
                />}
            >
            <View style={styles.section}>
                <Text style={styles.title}>Organisateurs à suivre</Text>
                <FlatList
                    data={organizers}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <OrganizerCard
                            name={item.name}
                            image={item.image}
                            isFollowing={item.isFollowing}
                            onFollowToggle={() => handleFollowToggle(item.id)}  
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ width: '100%' }}
                />
            </View>
            
            {/* Section: Événements populaires autour de vous */}
            {loading ? (
                    <ActivityIndicator size="large" color={COLORS.orange} />
                ) : (
                <View style={styles.section}>
                    <Text style={styles.title}>Événements populaires autour de vous</Text>
                    <FlatList
                        data={events}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => navigation.navigate('EventDetails', { id: item.id })}>
                                <EventCard
                                    id={item.id}
                                    eventName={item.name}
                                    date={item.date}
                                    location={item.location}
                                    imageUrl={item.imageUrl}
                                    price={item.price}
                                    organizer={item.idOrganizer}
                                />
                            </TouchableOpacity>
                        )}
                        showsVerticalScrollIndicator={false}
                        style={{ width: '100%' }}
                    />
                </View>
            )}
        </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightblack,
        width: '100%',
        shadowColor: COLORS.darkblack,
    },
    header: {
        backgroundColor: COLORS.darkblack,
        paddingVertical: 20,
    },
    section: {
        marginTop: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        marginHorizontal: 16,
        color: COLORS.white,

    },
});

export default HomeScreen;
