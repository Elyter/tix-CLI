import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message'; // Importation du module Toast
import { Entypo } from '@expo/vector-icons'; // Importation de l'icône Entypo
import { COLORS } from '../../assets/colors';


const EventForm = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(['', '', '', '', '', '', '', '']);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [numPhases, setNumPhases] = useState(1); // Nombre de phases initial

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
        <Text style={styles.title}>{title}</Text>
      </View>
    );
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
    Toast.show({
      type: 'success',
      text1: 'Événement ajouté avec succès !',
      visibilityTime: 3000, // 3 secondes
    
    })
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
              <View style={[styles.input, styles.datePickerContainer]}>
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="spinner"
                  onChange={handleDateChange}
                  textColor={COLORS.white} 
                  themeVariant="light" 
                />
              </View>
            </>
          ) : currentQuestionIndex === 3 ? (
            <View style={styles.numericInput}>
              <TouchableOpacity style={styles.phaseButton} onPress={decrementPhases}>
                <Text><Entypo name="minus" size={24} color="black" /></Text> 
              </TouchableOpacity>
              <TextInput
                style={[styles.input, styles.phaseInput]} 
                value={numPhases.toString()} 
                editable={false} 
              />
              <TouchableOpacity style={styles.phaseButton} onPress={incrementPhases}>
                <Text><Entypo name="plus" size={24} color="black" /></Text> 
              </TouchableOpacity>
            </View>
          ) : currentQuestionIndex >= 4 && currentQuestionIndex < questions.length - 2 ? (
            <TextInput
              style={styles.input}
              value={answers[currentQuestionIndex]}
              onChangeText={handleAnswer}
              placeholder="0 €"
              placeholderTextColor={COLORS.grey}
              keyboardType="numeric"
            />
          ) : (
            <TextInput
              style={styles.input}
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.orange,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerContainer: {
    alignItems: 'center',
    height: 200, // Hauteur du conteneur du calendrier
  },
  numericInput: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginHorizontal: -90,
  },
  phaseButtonText: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
  phaseInput: {
    fontSize: 34,
    marginBottom: 50,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
  },
});

export default EventForm;
