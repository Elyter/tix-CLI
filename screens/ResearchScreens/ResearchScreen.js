import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import { COLORS } from '../../assets/colors';

const ResearchScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [isChecked, setIsChecked] = useState(false); // État pour suivre si le bouton est coché

    const handleSearch = (text) => {
        setSearchText(text);
        // Ajoutez ici la logique pour filtrer en fonction du texte de recherche
    };

    const handleCheckboxPress = () => {
        setIsChecked(!isChecked); // Inverser l'état du carré à cocher
    };

    const handleSortButtonPress = () => {
        if (isChecked) { // Si le carré à cocher est coché, permettre à l'utilisateur de changer l'état du bouton
            // Ajouter ici la logique pour changer l'état du bouton
        }
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
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.checkbox}
                        onPress={handleCheckboxPress}
                    >
                        <View style={[styles.checkboxInner, isChecked && styles.checkboxCheckedInner]} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.sortButton, isChecked && styles.sortButtonChecked]}
                        onPress={handleSortButtonPress}
                        activeOpacity={isChecked ? 1 : 0} // Désactiver l'opacité si le bouton n'est pas coché
                    >
                        <Text style={[styles.sortButtonText, isChecked && styles.sortButtonTextChecked]}>Prix croissant</Text>
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
        flex:  1,
    },
    sortButton: {
        flexDirection: 'row', // Aligner le texte et le carré à cocher horizontalement
        alignItems: 'center', // Centrer les éléments verticalement
        backgroundColor: COLORS.orange, // Couleur de fond du bouton
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    sortButtonChecked: {
        backgroundColor: COLORS.green, // Couleur de fond du bouton lorsque coché
    },
    sortButtonText: {
        color: COLORS.darkblack,
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 8, // Ajouter une marge entre le carré à cocher et le texte
    },
    sortButtonTextChecked: {
        color: COLORS.white, // Couleur du texte lorsque le bouton est coché
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: COLORS.grey,
        borderRadius: 4,
    },
    checkboxChecked: {
        backgroundColor: COLORS.orange, // Couleur du carré à cocher lorsque coché
        borderColor: COLORS.orange, // Couleur de la bordure du carré à cocher lorsque coché
    },
});

export default ResearchScreen;
