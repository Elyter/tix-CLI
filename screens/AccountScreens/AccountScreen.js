import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Image, Switch, TouchableOpacity, Button } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

import { COLORS } from '../../assets/colors';

const AccountScreen = ({navigation}) => {
    const [isEnabled, setIsEnabled] = React.useState(false);
    const [userData, setUserData] = React.useState({});

    const isFocused = useIsFocused();

    useEffect(() => {
        const getData = async () => {
            try {
              const value = await AsyncStorage.getItem('userData');
              console.log(value);
              if(value === null) {
                navigation.replace("Login");
              } else {
                setUserData(JSON.parse(value));
              }
            } catch(e) {
              // error reading value
            }
        }
        getData();
    }, [isFocused])

    const handleDisconnect = () => {
        AsyncStorage.removeItem('userData')
        .then(() => {
            navigation.navigate('Login');
        })
        .catch((error) => {
            console.error('Error removing user data:', error);
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Feather name="user" size={75} color="white" />
                <View style={styles.name}>
                    <Text style={styles.title}>Jean Dupont</Text>
                    <Feather name="edit-2" size={18} color="#2B57F2" />
                </View>
                <View style={styles.stats}>
                    <View style={styles.allStat}>
                        <Text style={styles.number}>0</Text>
                        <Text style={styles.statName}>J'aime</Text>
                    </View>
                    <View style={styles.allStat}>
                        <Text style={styles.number}>0</Text>
                        <Text style={styles.statName}>Mes billets</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: "column", alignItems: 'center', borderRightWidth: 1}}>
                        <Text style={styles.number}>0</Text>
                        <Text style={styles.statName}>Suivi(e)s</Text>
                    </View>
                </View>
                <View style={styles.settings}>
                    <View style={{height: 1, width: "100%", position: "absolute", backgroundColor: COLORS.grey, marginTop: 15}}/>
                    <Text style={{fontSize: 24, fontWeight: 'bold', color: COLORS.white, marginTop: 30, marginBottom: 15, borderTopWidth: 1, borderTopColor: COLORS.grey, marginLeft: 10}}>Paramètres</Text>
                    <View style={styles.param}>
                        <Text style={styles.paramText}>Ville principal</Text>
                        <Text style={{color: COLORS.blue, marginRight: 5}}>Paris</Text>
                    </View>
                    <View style={styles.param}>
                        <Text style={styles.paramText}>Copier les évènements dans le calendrier</Text>
                        <Switch value={isEnabled} style={{ 
                            transform: [{ scaleX: .8 }, { scaleY: .8 }]
                        }}
                        onChange={() => {{setIsEnabled(previousState => !previousState);}}}
                        />
                    </View>
                    <TouchableOpacity style={styles.param}>
                        <Text style={styles.paramText}>Gérer les évènements</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="grey" />                    
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.param}>
                        <Text style={styles.paramText}>Gérer les options de connexion</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="grey" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.param}>
                        <Text style={styles.paramText}>Paramètres du compte</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="grey" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.param} onPress={handleDisconnect}>
                        <Text style={styles.paramText}>Deconnexion</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="grey" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.lightblack,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.white,
        marginRight: 10
    },
    info: {
        flexDirection: "column",
        alignItems: 'center',
        marginTop: 40
    },
    name: {
        flexDirection: "row",
        alignItems: 'center',
        marginTop: 20
    },
    stats: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20
    },
    allStat: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: COLORS.grey,
    },
    number: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.white
    },
    statName: {
        marginTop: 10,
        fontSize: 18,
        color: COLORS.blue
    },
    settings: {
        flexDirection: "column",
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
    },
    param: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBlockColor: COLORS.grey,
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 5,
    },
    paramText: {
        color: COLORS.white,
        flex: 1,
        paddingTop: 20,
        paddingBottom: 20,
    }
});


export default AccountScreen;
