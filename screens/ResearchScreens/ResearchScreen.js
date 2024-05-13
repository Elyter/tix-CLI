import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import { COLORS } from '../../assets/colors';

const ResearchScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [sortOption, setSortOption] = useState('Prix croissant');

    const handleSearch = (text) => {
        setSearchText(text);
        // Ajoutez ici la logique pour filtrer en fonction du texte de recherche
    };

    const handleSortOptionChange = () => {
        if (sortOption === 'Trier : Prix croissant') {
            setSortOption('Trier : Prix décroissant');
        } else if (sortOption === 'Trier : Prix décroissant') {
            setSortOption('tri : Désactivé');
        } else {
            setSortOption('Trier : Prix croissant');
        }
        // Ajoutez ici la logique pour trier en fonction de l'option sélectionnée
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Rechercher..."
                        placeholderTextColor={COLORS.grey}
                        value={searchText}
                        onChangeText={handleSearch}
                    />
                </View>
                <View style={styles.sortButtonContainer}>
                    <TouchableOpacity
                        style={styles.sortButton}
                        onPress={handleSortOptionChange}
                    >
                        <Text style={styles.sortButtonText}>{sortOption}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Ajoutez le reste de votre contenu de recherche ici */}
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
        paddingVertical: 50,
        paddingHorizontal: 20,
        flexDirection: 'column', // Changement pour une disposition en colonne
        alignItems: 'center', // Centrer les éléments horizontalement
    },
    searchContainer: {
        backgroundColor: COLORS.lightblack,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20, // Ajout de marge en bas pour séparer la barre de recherche du bouton
        borderWidth: 1,
        borderColor: COLORS.grey,
    },
    searchInput: {
        color: 'white',
        flex: 1,
    },
    sortButtonContainer: {
        width: '100%', // Assurer que le conteneur occupe toute la largeur
        alignItems: 'flex-end', // Aligner le bouton à droite
    },
    sortButton: {
        backgroundColor: COLORS.orange,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        width: 180, // Largeur fixe du bouton
    },
    sortButtonText: {
        color: COLORS.darkblack,
        fontSize: 14,
        fontWeight: '500',
    },
});

export default ResearchScreen;
