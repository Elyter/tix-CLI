import React from 'react';
import { View, Text, StyleSheet, Image, Switch, TouchableOpacity } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';

import { COLORS } from '../../assets/colors';

const AccountScreen = () => {
    const [isEnabled, setIsEnabled] = React.useState(false);

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
                    <Text style={{fontSize: 24, fontWeight: 'bold', color: "#FFF", marginTop: 30, marginBottom: 15, borderTopWidth: 1, borderTopColor: COLORS.grey, marginLeft: 10}}>Paramètres</Text>
                    <View style={styles.param}>
                        <Text style={styles.paramText}>Ville principal</Text>
                        <Text style={{color: "#2B57F2", marginRight: 5}}>Paris</Text>
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
        color: "#FFF",
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
        color: "#FFF"
    },
    statName: {
        marginTop: 10,
        fontSize: 18,
        color: "#2B57F2"
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
        color: "#FFF",
        flex: 1,
        paddingTop: 20,
        paddingBottom: 20,
    }
});


export default AccountScreen;
