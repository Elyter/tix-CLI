import React from 'react';
import { View, StyleSheet } from 'react-native';
import SearchBar from '../../components/SearchBar'; // Assurez-vous que le chemin du composant SearchBar est correct
import { COLORS } from '../../assets/colors';

const ResearchScreen = () => {
    return (
        <View style={styles.container}>
            <SearchBar style={styles.searchBar} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.lightblack,
    },
    searchBar: {
        width: '80%', // Vous pouvez ajuster la largeur selon vos besoins
        // Ajoutez d'autres styles pour le searchBar si nécessaire
    },
});

export default ResearchScreen;
