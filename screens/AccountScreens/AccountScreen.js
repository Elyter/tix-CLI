import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { COLORS } from '../../assets/colors';

const AccountScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Image source={require('../../assets/images/pp.png')} />
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
    }
});


export default AccountScreen;
