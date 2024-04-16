import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Share, Alert, Image, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';
import { AntDesign, Entypo, Feather, Fontisto } from '@expo/vector-icons';
import HeartButton from '../../components/HeartButton';
import { Buffer } from "buffer";
import { useIsFocused } from '@react-navigation/native';

import { COLORS } from '../../assets/colors';

const EventDetails = ({route, navigation}) => {
    const { id } = route.params;
    const [event, setEvent] = useState(null);
    const [imageData, setImageData] = useState(null);
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const url = API_URL + '/events/' + id;
        axios.get(url)
        .then((response) => {
            setEvent(response.data);
            axios.get(API_URL + response.data.imageUrl, { responseType: 'arraybuffer' })
            .then((response) => {
                setImageData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error getting image data:', error);
            });
        })
        .catch((error) => {
            console.error('Error getting event data:', error);
        });
    }, [isFocused]);
    
    const onShare = async () => {
        try {
            const result = await Share.share({
                url:
                    'https://docs.expo.io/',
                message:
                    'React Native | A framework for building native apps using React',
            });
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                barStyle="light-content"
            />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={27} color={COLORS.orange}  style={{marginTop: 60, marginBottom: 15 }}/>
                </TouchableOpacity>
                <View style={{display: "flex", flexDirection: "row"}}>
                    <View style={styles.buttonContainer}>
                        <HeartButton isLiked={false} size={27} onPress={() => console.log('Like pressed')} />
                    </View>
                    <TouchableOpacity onPress={onShare}>
                        <Entypo name="share-alternative" size={27} color={COLORS.orange}  style={{marginTop: 57, marginBottom: 10, marginRight: 17 }}/>
                    </TouchableOpacity>
                    <Feather name="more-vertical" size={27} color={COLORS.orange}  style={{marginTop: 60, marginBottom: 10 }} />
                </View>
            </View>
            <ScrollView style={styles.info}>
                {loading ? (
                    <ActivityIndicator size="large" color={COLORS.orange} />
                ) : (
                    <View>
                        {imageData && (
                            <Image
                                source={{ uri: `data:image/jpeg;base64,${Buffer.from(imageData, 'binary').toString('base64')}` }}
                                style={styles.eventImage}
                            />
                        )}
                        <View style={styles.tagContainer}>
                            <View style={styles.tag}>
                                <Text style={{fontSize: 16, color: COLORS.white, fontWeight: 'bold', padding: 2}}>Popular</Text>
                            </View>
                        </View>
                        <Text style={styles.title}>{event.name}</Text>
                        <Text>{event.idOrganizer}</Text>
                        <View style={styles.dateContainer}>
                            <Fontisto name="date" size={30} color={COLORS.orange} />
                            <Text style={{color: COLORS.white, fontSize: 20, fontWeight: 'bold', marginLeft: 30, marginTop: 3}}>{event.date}</Text>     
                        </View>
                        <View style={styles.dateContainer}>
                            <Entypo name="location-pin" size={30} color={COLORS.orange} />
                            <Text style={{color: COLORS.white, fontSize: 20, fontWeight: 'bold', marginLeft: 30, marginTop: 3}}>{event.location}</Text>
                        </View>
                    </View>
                )}
            </ScrollView>
            {loading ? (
                    <ActivityIndicator size="large" color={COLORS.orange} />
                ) : (
            <View style={styles.ticketContainer}>
                <Text style={{color: COLORS.white, fontSize: 30, fontWeight: 'bold', marginTop: 5}}>{event.price} €</Text>
                <TouchableOpacity style={{backgroundColor: COLORS.orange, padding: 10, marginLeft: 50, borderRadius: 4}}>
                    <Text style={{color: COLORS.white, fontWeight: 'bold', fontSize: 20}}>Acheter un billet</Text>
                </TouchableOpacity>
            </View>
            )}
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    header: {
        backgroundColor: COLORS.darkblack,
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 60,
        marginRight: 25,
    },
    eventImage: {
        width: Dimensions.get('window').width - 40,
        height: 300,
        borderRadius: 8,
        marginBottom: 8,
    }, 
    info: {
        padding: 20,
    },
    tag: {
        fontSize: 16,
        color: COLORS.white,
        fontWeight: 'bold',
        marginBottom: 10,
        backgroundColor: COLORS.orange,
        padding: 5,
        borderRadius: 4,
    },
    tagContainer: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
    },
    dateContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
    },
    ticketContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 30
    },    
});

export default EventDetails;
