import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { COLORS } from '../assets/colors';
import HeartButton from './HeartButton'; // Importez le composant HeartButton
import axios from 'axios';
import { API_URL } from '@env';
import { Buffer } from "buffer";
import AsyncStorage from '@react-native-async-storage/async-storage';

const EventCard = ({ id, eventName, date, location, imageUrl, price, organizer }) => {
    const [imageData, setImageData] = useState(null);
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState();

    const likeUpdate = () => {
        axios.post(API_URL + '/likes/' + userData.uid, {
            eventId: id,
        })
        .then((response) => {
            if (response.data.message === "like enregistré") {
                setLiked(true)
            } else {
                setLiked(false);
            }
            console.log('Like added:', response.data);
        })
        .catch((error) => {
            console.error('Error adding like:', error);
        });
    };

    useEffect(() => {
        setLoading(true);
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('userData');
                setUserData(value)
                const url = API_URL + '/userData/' + value.replace(/"/g, '')
                axios.get(url)
                .then((response) => {
                    setUserData(response.data);
                    const likesUrl = API_URL + '/likes/' + response.data.uid;
                    axios.get(likesUrl)
                    .then((likesResponse) => {
                        likesResponse.data.forEach(element => {
                            if (element.eventId === id) {
                                setLiked(true);
                            }
                        });
                        setLoading(false);
                    })
                    .catch((error) => {
                        if (error.response.status === 404) {
                            setLoading(false);
                        }
                    });
                })
                .catch((error) => {
                    console.error('Error getting user data:', error);
                });
            } catch (error) {
                console.error('Error getting async storage:', error);
            }
        }
        getData();
        const fetchImage = async () => {
            try {
                console.log('Chargement de l\'image:', API_URL + imageUrl)
                const response = await axios.get(API_URL + imageUrl, { responseType: 'arraybuffer' });
                setImageData(response.data);
            } catch (error) {
                console.error('Erreur lors du chargement de l\'image:', error);
            }
        };

        fetchImage();
    }, []);

    return (
        <View style={[styles.card, styles.container]}>
            {loading ? (
                <ActivityIndicator size="large" color={COLORS.orange} />
            ) : (
                <>
                    <Image
                        source={{ uri: `data:image/jpeg;base64,${Buffer.from(imageData, 'binary').toString('base64')}` }}
                        style={styles.eventImage}
                    />
                    <View style={styles.content}>
                        <Text style={styles.eventName}>{eventName}</Text>
                        <Text style={styles.organizer}>{organizer}</Text>
                        <Text style={styles.date}>{date}</Text>
                        <Text style={styles.location}>{location}</Text>
                        <Text style={styles.price}>{price} €</Text>
                        <View style={styles.buttonContainer}>
                            <HeartButton isLiked={liked} size={20} onPress={() => likeUpdate()} />
                        </View>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.darkblack,
        padding: 16,
        margin: 8,
        borderRadius: 8,
        shadowColor: COLORS.darkblack,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    container: {
        minHeight: 300, // Définissez une hauteur minimale pour la carte
    },
    eventImage: {
        width: '100%',
        height: 210,
        borderRadius: 8,
        marginBottom: 8,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    eventName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    location: {
        color: COLORS.white,
        fontWeight: '700',
    },
    date: {
        color: COLORS.white,
        fontWeight: '700',
    },
    price: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    organizer: {
        color: COLORS.grey,
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 85,
        right: 0,
        backgroundColor: COLORS.darkblack,
        padding: 9,
        borderRadius: 100,
        marginRight: 16,
        marginBottom: 16,
    },
});

export default EventCard;