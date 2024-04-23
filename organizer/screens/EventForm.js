import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, Modal, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons'; // Importation de l'icône Entypo
import { AntDesign } from '@expo/vector-icons'; // Importation de l'icône AntDesign
import DateTimePicker from '@react-native-community/datetimepicker';
import ToastBar from '../component/Toastbar';
import { COLORS } from '../../assets/colors';
import { useNavigation } from '@react-navigation/native'; // Importation de useNavigation
import * as ImagePicker from 'expo-image-picker';

const EventForm = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(['', '', '', '', '', '', '', '']);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [numPhases, setNumPhases] = useState(1); // Nombre de phases initial
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showDatePickerModal, setShowDatePickerModal] = useState(false); // Déplacer le hook useState ici
  const [selectedImage, setSelectedImage] = useState(null);

  const navigation = useNavigation(); // Obtenir l'objet de navigation

  const questions = [
    'Nom de l\'événement:',
    'Date:',
    'Lieu:',
    'Nombre de phases:',
    ...Array.from({ length: numPhases }, (_, i) => `Prix des billets de la phase ${i + 1}:`),
    'Image:',
    'Description:',
  ];

  const CustomHeader = ({ title }) => {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackButton}>
          <AntDesign name="left" size={27} color={COLORS.orange} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  };

  const handleBackButton = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswer = (text) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = text;
    setAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      if (currentQuestionIndex === 1) {
        const currentDate = new Date();
        if (selectedDate < currentDate) {
          alert('Veuillez choisir une date future.');
          return;
        }
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } 
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setSelectedDate(currentDate);
    const formattedDate = currentDate.toLocaleDateString('fr-FR');
    handleAnswer(formattedDate);
    setShowDatePickerModal(false); // Fermer le modal après la sélection de la date
  };

  const decrementPhases = () => {
    if (numPhases > 1) {
      setNumPhases(numPhases - 1);
    }
  };

  const incrementPhases = () => {
    if (numPhases < 5) {
      setNumPhases(numPhases + 1);
    }
  };

  const handleSubmit = () => {
    // Vous pouvez ajouter le code pour soumettre les réponses ici
    console.log('Réponses soumises :', answers);
    // Réinitialisez les réponses et revenez à la première question
    setAnswers(['', '', '', '', '', '', '', '']);
    setCurrentQuestionIndex(0);
    // Affichez un message de succès ou naviguez vers une autre vue
    setToastMessage('Événement ajouté !'); 
    setShowToast(true); // Affichez le ToastBar
    setTimeout(() => {
      setShowToast(false); // Cachez le ToastBar après 3 secondes
    }, 3000);
    navigation.navigate('MyEvents');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      handleAnswer(result.uri);
    }
  };

  // Calcul du pourcentage d'avancement
  const progressPercentage = (currentQuestionIndex + 1) / questions.length * 100;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <CustomHeader title="Ajouter un événement" />
        {/* Barre de progression */}
        <View style={styles.progressBar}>
          <View style={{ width: `${progressPercentage}%`, backgroundColor: COLORS.orange, height: 5 }} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.questionText}>{questions[currentQuestionIndex]}</Text>
          {/* Le reste du contenu du formulaire */}
          {currentQuestionIndex === 1 ? (
            <>
              <TouchableOpacity style={[styles.input, styles.datePickerContainer]} onPress={() => setShowDatePickerModal(true)}>
                <Text style={styles.datePickerText}>{selectedDate.toLocaleDateString('fr-FR')}</Text>
              </TouchableOpacity>
              <Modal
                visible={showDatePickerModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowDatePickerModal(false)}
              >
                <TouchableWithoutFeedback onPress={() => setShowDatePickerModal(false)}>
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        display="spinner"
                        onChange={handleDateChange}
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            </>
          ) : currentQuestionIndex === questions.length-2 ? (
            <>
              <TouchableOpacity style={styles.input} onPress={pickImage}>
                <Text style={styles.datePickerText}>Choisir une image</Text>
              </TouchableOpacity>
              {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
            </>
          ) : currentQuestionIndex === 3 ? (
            <View style={styles.numericInput}>
              <TouchableOpacity style={styles.phaseButton} onPress={decrementPhases}>
                <Entypo name="minus" size={24} color="black" /> 
              </TouchableOpacity>
              <Text style={styles.phaseInput}>{numPhases}</Text>
              <TouchableOpacity style={styles.phaseButton} onPress={incrementPhases}>
                <Entypo name="plus" size={24} color="black" /> 
              </TouchableOpacity>
            </View>
          ) : currentQuestionIndex >= 5 && currentQuestionIndex < questions.length - 1 ? (
            <TextInput
              style={[styles.input, answers[currentQuestionIndex] === '' ? styles.emptyInput : null]}
              value={answers[currentQuestionIndex]}
              onChangeText={handleAnswer}
              placeholder="Réponse"
              placeholderTextColor={COLORS.grey}
            />
          ) : (
            <TextInput
              style={[styles.input, answers[currentQuestionIndex] === '' ? styles.emptyInput : null]}
              value={answers[currentQuestionIndex]}
              onChangeText={handleAnswer}
              placeholder="Réponse"
              placeholderTextColor={COLORS.grey}
            />
          )}
        </View>
  
        {currentQuestionIndex < questions.length - 1 ? (
          <TouchableOpacity style={styles.button} onPress={handleNextQuestion}>
            <Text style={styles.buttonText}>Question suivante</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Ajouter l'événement</Text>
          </TouchableOpacity>
        )}
        {showToast && <ToastBar message={toastMessage} />}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightblack,
  },
  header: {
    height: 110,
    backgroundColor: COLORS.darkblack,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.orange,
    marginLeft: 60,
  },
  progressBar: {
    height: 5,
    backgroundColor: COLORS.grey,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: 100,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: '90%',
    marginBottom: 10,
    marginTop: 60,
    color: COLORS.white,
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyInput: {
    borderColor: COLORS.grey,
  },
  datePickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  datePickerText: {
    color: COLORS.white,
    fontSize: 16,
  },
  numericInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '55%',
  },
  buttonText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: COLORS.orange,
    width: '90%',
    paddingVertical: 15,
    borderRadius: 5,
    shadowColor: COLORS.darkblack,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  phaseButton: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 65,
  },
  phaseInput: {
    fontSize: 34,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: 65,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.lightblack,
    borderRadius: 10,
    padding: 20,
  },
});

export default EventForm;
