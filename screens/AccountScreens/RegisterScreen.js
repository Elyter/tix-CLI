import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithCredential } from "firebase/auth";
import firebase from "firebase/app";
import { COLORS } from '../../assets/colors';
import Button from '../../components/Button';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AppleAuthentication from 'expo-apple-authentication';

const RegisterScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isFocused = useIsFocused();

    useEffect(() => {
        const getData = async () => {
            try {
              const value = await AsyncStorage.getItem('userData');
              if(value !== null) {
                navigation.navigate("Account");
              }
            } catch(e) {
              // error reading value
            }
        }
        getData();
    }, [isFocused])

    // const signUpWithApple = async () => {
    //     try {
    //       const { identityToken, nonce } = await AppleAuthentication.signInAsync({
    //         requestedScopes: [AppleAuthentication.AppleAuthenticationScope.FULL_NAME, AppleAuthentication.AppleAuthenticationScope.EMAIL],
    //       });
      
    //       const credential = firebase.auth.AppleAuthProvider.credential(identityToken, nonce);
    //       await firebase.auth().createUserWithCredential(credential);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };

    const handleRegister = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // Store user data in AsyncStorage
            AsyncStorage.setItem('userData', JSON.stringify(user))
            .then(() => {
                console.log('User data stored successfully');
                // Navigate to next screen or do any other action
            })
            .catch((error) => {
                console.error('Error storing user data:', error);
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
              console.log('Email déjà utilisé');
            } else if (errorCode === 'auth/invalid-email') {
                console.log('Email invalide');
            } else if (errorCode === 'auth/weak-password') {
                console.log('Mot de passe trop faible (6 caractères minimum)');
            }
          });
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                    autoComplete="email"
                    autoCorrect={false}
                    autoCapitalize='none'
                    keyboardType='email-address'
                />
                <TextInput
                    placeholder="Mot de passe"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    autoComplete="new-password"
                    autoCorrect={false}
                    autoCapitalize='none'
                />
                <Button title="Créer un compte" onPress={handleRegister} />
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={{color: 'white', marginTop: 10}}>déjà un compte ? Connectez vous</Text>
                </TouchableOpacity>
                {/* <View style={{ width: 200, height: 5, backgroundColor: 'lightgrey', borderRadius: 50, marginBottom: 40, marginTop: 25}}/>
                <AppleAuthentication.AppleAuthenticationButton
                    buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP}
                    buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                    cornerRadius={5}
                    style={styles.apple}
                    onPress={signUpWithApple}
                /> */}
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.lightblack,
        paddingTop: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
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
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    googleButton: {
        backgroundColor: '#e9e9e9',
        padding: 12,
        borderRadius: 50,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '80%',
    },
    form: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 20
    },
    apple: {
        width: 200,
        height: 50,
        marginBottom: 20
    }
});

export default RegisterScreen;