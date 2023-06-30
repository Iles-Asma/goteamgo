import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    Platform,
    TextInput,
    Alert,
} from "react-native";
import GoButton from '../components/GoButton';
import GoTextInput from "../components/GoTextInput";
import GoButtonOutlined from "../components/GoButtonOutlined";
import Logo from "../../assets/svg/Logo";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GoLogin({ navigation }) {

    const IP = "localhost";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const isEmailValid = (email) => {
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return emailRegex.test(email);
    // };

    const handleLogin = async () => {

        // if (!isEmailValid(email)) {
        //     Alert.alert("Erreur", "Veuillez entrer une adresse email valide.");
        //     return;
        // }

        console.log('Email:', email);
        console.log('Mot de passe:', password);

        try {
            const response = await fetch(`http://${IP}:5000/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.token) {
                // Stocker le jeton dans un stockage sécurisé
                await AsyncStorage.setItem('userToken', data.token);

                // Rediriger vers la page d'accueil
                navigation.navigate('Home');
            } else {
                Alert.alert("Erreur", "Identifiant ou mot de passe incorrect. Veuillez réessayer.");
            }
        } catch (error) {
            Alert.alert("Erreur", "Une erreur s'est produite lors de la tentative de connexion.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />

            <Logo style={{ marginTop: 85 }} />

            <Text style={styles.titre}>Welcome Back !</Text>

            <GoTextInput
                value={email}
                placeholder="Email"
                onChangeText={setEmail}
            />

            <GoTextInput
                placeholder="Mot de passe"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />
            <View style={styles.btnEspace}>
                <GoButton onPress={handleLogin} btnTxt="Connexion" />

                <GoButtonOutlined btnTxt="S'inscrire" onPress={() => navigation.navigate('GoSignup')} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    titre: {
        color: "#121212",
        fontWeight: 'bold',
        height: 40,
        width: 330,
        fontSize: 30,
        marginTop: 60,
        marginBottom: 20
    },

    container: {
        flex: 1,
        paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight : 40,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#ffffff",
        gap: 10
    },

    btnEspace: {
        gap: 10,
    },

    errorText: {
        color: 'red',
        marginBottom: 10,
    }
});
