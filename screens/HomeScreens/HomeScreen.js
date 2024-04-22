import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'; // Importez ScrollView
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

    const [organizers, setOrganizers] = useState([
        { id: 1, name: 'Organizer 1', image: require('../../assets/images/organizer1.jpg'), isFollowing: false},
        { id: 2, name: 'Organizer 2', image: require('../../assets/images/organizer1.jpg'), isFollowing: false},
        { id: 3, name: 'Organizer 3', image: require('../../assets/images/organizer1.jpg'), isFollowing: false},
        { id: 4, name: 'Organizer 4', image: require('../../assets/images/organizer1.jpg'), isFollowing: false},
        { id: 5, name: 'Organizer 5', image: require('../../assets/images/organizer1.jpg'), isFollowing: false},
        // les organisateurs
    ]);

    useEffect(() => {
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
    }, [isFocused])

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
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <SearchBar />
            </View>
            {/* Section: Organisateurs à suivre */}
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
