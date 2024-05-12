import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../../assets/colors'; // Importez vos couleurs depuis votre fichier de couleurs
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const FollowersList = () => {
  const navigation = useNavigation(); // Hook de navigation

  // Mock data for followers
  const followersData = [
    { id: '1', username: 'user1', profileImage: require('../../assets/images/elyter.jpg') },
    { id: '2', username: 'user2', profileImage: require('../../assets/images/salim.jpg') },
    { id: '3', username: 'user3', profileImage: require('../../assets/images/elyter.jpg') },
    { id: '4', username: 'user4', profileImage: require('../../assets/images/elyter.jpg') },
    { id: '5', username: 'user5', profileImage: require('../../assets/images/elyter.jpg') },
    { id: '6', username: 'user6', profileImage: require('../../assets/images/salim.jpg') },
    { id: '7', username: 'user7', profileImage: require('../../assets/images/elyter.jpg') },
    { id: '8', username: 'user8', profileImage: require('../../assets/images/salim.jpg') },
    { id: '9', username: 'user9', profileImage: require('../../assets/images/salim.jpg') },
    { id: '10', username: 'user10', profileImage: require('../../assets/images/elyter.jpg') },
  ];

  // Render item for FlatList
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.profileImage} style={styles.profileImage} />
      <Text style={styles.title}>{item.username}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
        <AntDesign name="left" size={27} color={COLORS.orange} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.header}>Liste des followers</Text>
        <View style={styles.separator}></View>
      </View>
      <FlatList
        data={followersData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightblack, // Utilisez votre couleur lightblack
    alignItems: 'stretch', // Permet aux éléments enfants de s'étirer sur toute la largeur
    justifyContent: 'center', 
  },
  titleContainer: {
    marginBottom: 10,
    backgroundColor: COLORS.darkblack, // Couleur de fond du titre
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.orange, // Couleur de l'en-tête
    textAlign: 'center', // Centrer le texte
    marginTop: 60, // Marge supérieure
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
    marginTop: 20,
    
  },
  item: {
    backgroundColor: COLORS.lightblack, // Couleur de fond des éléments de la liste
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5, // Ajoutez une bordure arrondie aux éléments
    flexDirection: 'row', // Aligner les éléments horizontalement
    alignItems: 'center', // Centrer les éléments verticalement
    shadowColor: COLORS.black, // Couleur de l'ombre
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Pour les ombres sur Android
  },
  title: {
    fontSize: 16,
    color: COLORS.white, // Couleur du texte
    textAlign: 'center', // Centrer le texte
    marginLeft: 20, // Marge à gauche pour séparer l'image du texte
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 250, // Pour arrondir l'image
  },
  iconContainer: {
    position: 'absolute',
    top: 62,
    left: 20,
    zIndex: 1, // Pour placer l'icône au-dessus du contenu
  },
});

export default FollowersList;
