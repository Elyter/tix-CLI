import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import { COLORS } from '../../assets/colors';
import Button from '../../components/Button';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const EditProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);
        
        const formData = new FormData();
        // Get the file name without extension
        const fileName = result.uri.split('/').pop().split('.')[0];
        formData.append('image', {
            uri: result.uri,
            type: 'image/jpeg', // or whatever your image type is
            name: fileName + '.jpg', // Ensure file name has extension
        });

        try {
            const response = await axios.post( API_URL + '/images/users', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // Add any additional headers here
                },
            });
            console.log('Image uploaded successfully!', response.data);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleSaveProfile = () => {
        console.log('Name:', name);
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
                <Button
                    title="Pick an image from camera roll"
                    onPress={pickImage}
                    style={styles.button}
                />
                <TextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Bio"
                    value={bio}
                    onChangeText={setBio}
                    style={styles.input}
                />
                <Button
                    title="Enregistrer"
                    onPress={handleSaveProfile}
                    style={styles.button}
                />
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
    input: {
        width: '80%',
        height: 48,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 50,
        marginBottom: 16,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 4,
    },
    form: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 20
    },
});

export default EditProfileScreen;
