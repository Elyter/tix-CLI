import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { COLORS } from '../../assets/colors';

const ResearchScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [priceAscChecked, setPriceAscChecked] = useState(false);
    const [priceDescChecked, setPriceDescChecked] = useState(false);
    const [dateChecked, setDateChecked] = useState(false);

    const handleSearch = (text) => {
        setSearchText(text);
        // Ajoutez ici la logique pour filtrer en fonction du texte de recherche
    };

    const handleCheckboxPress = () => {
        setIsChecked(!isChecked);
        // Désactiver les autres boutons
        setPriceAscChecked(false);
        setPriceDescChecked(false);
        setDateChecked(false);
    };

    const handlePriceAscPress = () => {
        setPriceAscChecked(!priceAscChecked);
        // Désactiver les autres boutons
        setIsChecked(false);
        setPriceDescChecked(false);
        setDateChecked(false);
    };

    const handlePriceDescPress = () => {
        setPriceDescChecked(!priceDescChecked);
        // Désactiver les autres boutons
        setIsChecked(false);
        setPriceAscChecked(false);
        setDateChecked(false);
    };

    const handleDatePress = () => {
        setDateChecked(!dateChecked);
        // Désactiver les autres boutons
        setIsChecked(false);
        setPriceAscChecked(false);
        setPriceDescChecked(false);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                            style={[styles.filterButton, priceAscChecked ? styles.activeFilter : styles.inactiveFilter]}
                            onPress={handlePriceAscPress}
                        >
                            <Text style={styles.filterButtonText}>Prix croissant</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.filterButton, priceDescChecked ? styles.activeFilter : styles.inactiveFilter]}
                            onPress={handlePriceDescPress}
                        >
                            <Text style={styles.filterButtonText}>Prix décroissant</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.filterButton, dateChecked ? styles.activeFilter : styles.inactiveFilter]}
                            onPress={handleDatePress}
                        >
                            <Text style={styles.filterButtonText}>Bientôt</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text>Mets tous les articles ici : </Text>
                {/* Ajoutez le reste de votre contenu de recherche ici */}
            </View>
        </TouchableWithoutFeedback>
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
        flexDirection: 'column',
        alignItems: 'center',
    },
    searchContainer: {
        backgroundColor: COLORS.lightblack,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: COLORS.grey,
    },
    searchInput: {
        color: 'white',
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: -20,
    },
    filterButton: {
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    filterButtonText: {
        color: COLORS.darkblack,
        fontSize: 14,
        fontWeight: '500',
    },
    activeFilter: {
        backgroundColor: COLORS.orange,
    },
    inactiveFilter: {
        backgroundColor: COLORS.grey,
        opacity: 0.5,
    },
});

export default ResearchScreen;
