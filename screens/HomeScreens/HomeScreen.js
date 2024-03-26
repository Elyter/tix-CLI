import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native'; // Importez ScrollView
import EventCard from '../../components/EventCard';
import SearchBar from '../../components/SearchBar';
import OrganizerCard from '../../components/OrganizerCard'; // Importez le composant OrganizerCard

import { COLORS } from '../../assets/colors';

const HomeScreen = () => { 
    const [events, setEvents] = useState([
        { id: 1, eventName: 'Event 1', date: 'Mardi 15 Mars à 18:00', location: 'Venue 1', eventImage: require('../../assets/images/event1.jpg'), price: "9,99€", organizer: 'Organizer 1' },
        { id: 2, eventName: 'Event 2', date: 'Dimanche 20 Mars à 22:00', location: 'Arkéa Arena', eventImage: require('../../assets/images/event2.jpg'), price: "199,99€", organizer: 'Tyla' },
        { id: 3, eventName: 'Event 3', date: '2024-03-25', location: 'Venue 3', eventImage: require('../../assets/images/event3.jpg'), price: "29,99€", organizer: 'LaTeuf' },
        { id: 4, eventName: 'Event 4', date: '2024-03-30', location: 'Venue 4', eventImage: require('../../assets/images/event1.jpg'), price: "FREE", organizer: 'Organizer 4' },
        { id: 5, eventName: 'Event 5', date: '2024-04-05', location: 'Venue 5', eventImage: require('../../assets/images/event1.jpg'), price: "From 5,75€", organizer: 'Organizer 5' },
        { id: 6, eventName: 'Event 6', date: '2024-04-10', location: 'Venue 6', eventImage: require('../../assets/images/event1.jpg'), price: "19,99€", organizer: 'Organizer 6' },
        { id: 7, eventName: 'Event 7', date: '2024-04-15', location: 'Venue 7', eventImage: require('../../assets/images/event1.jpg'), price: "5€", organizer: 'Organizer 7' },
        { id: 8, eventName: 'Event 8', date: '2024-04-16', location: 'Venue 8', eventImage: require('../../assets/images/event1.jpg'), price: "8€", organizer: 'Organizer 8' },
        // les events 
    ]);

    const [organizers, setOrganizers] = useState([
        { id: 1, name: 'Organizer 1', image: require('../../assets/images/organizer1.jpg'), isFollowing: false},
        { id: 2, name: 'Organizer 2', image: require('../../assets/images/organizer1.jpg'), isFollowing: false},
        { id: 3, name: 'Organizer 3', image: require('../../assets/images/organizer1.jpg'), isFollowing: false},
        { id: 4, name: 'Organizer 4', image: require('../../assets/images/organizer1.jpg'), isFollowing: false},
        { id: 5, name: 'Organizer 5', image: require('../../assets/images/organizer1.jpg'), isFollowing: false},
        // les organisateurs
    ]);




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
            <View style={styles.section}>
                <Text style={styles.title}>Événements populaires autour de vous</Text>
                <FlatList
                    data={events}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <EventCard
                            eventName={item.eventName}
                            date={item.date}
                            location={item.location}
                            eventImage={item.eventImage}
                            price={item.price}
                            organizer={item.organizer}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    style={{ width: '100%' }}
                />
            </View>
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
