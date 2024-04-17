import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../assets/colors';

const EventForm = () => {
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [organizer, setOrganizer] = useState('');

  const handleSubmit = () => {
    // Logic to handle form submission (e.g., API call to add event)
    console.log('Event submitted:', { eventName, date, location, price, organizer });
    // You can add your logic to handle form submission here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un événement</Text>
      <Text style={styles.label}>Nom de l'événement:</Text>
      <TextInput
        style={styles.input}
        value={eventName}
        onChangeText={setEventName}
        placeholder="Nom de l'événement"
      />
      <Text style={styles.label}>Date:</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="Date"
      />
      <Text style={styles.label}>Lieu:</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Lieu"
      />
      <Text style={styles.label}>Prix:</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Prix"
      />
      <Text style={styles.label}>Organisateur:</Text>
      <TextInput
        style={styles.input}
        value={organizer}
        onChangeText={setOrganizer}
        placeholder="Organisateur"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Ajouter l'événement</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.lightblack,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.orange,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: COLORS.white,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: COLORS.white,
  },
  button: {
    backgroundColor: COLORS.orange,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EventForm;
