import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    Platform,
    KeyboardAvoidingView,
    Alert
} from "react-native";
import React, { useState } from "react";
import GoButton from '../components/GoButton';
import GoTextInput from "../components/GoTextInput";
import GoButtonOutlined from "../components/GoButtonOutlined";
import Logo from "../../assets/svg/Logo";

export default function GoSignup({ navigation }) {

    const IP = "192.168.1.120";

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {

        // Check if the inputs are valid
        // if (nom.trim().length < 2) {
        //     Alert.alert("Erreur", "Le nom doit contenir au moins 2 caractères.");
        //     return;
        // }

        // if (prenom.trim().length < 2) {
        //     Alert.alert("Erreur", "Le prénom doit contenir au moins 2 caractères.");
        //     return;
        // }

        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!emailRegex.test(email)) {
        //     Alert.alert("Erreur", "Veuillez entrer une adresse e-mail valide.");
        //     return;
        // }

        // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;
        // if (!passwordRegex.test(password)) {
        //     Alert.alert("Erreur", "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.");
        //     return;
        // }

        try {
            const response = await fetch(`http://${IP}:5000/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nom, prenom, email, password })
            });

            if (response.status === 201) {
                navigation.navigate('GoRedirectionSignup');
            } else {
                Alert.alert("Erreur", "L'inscription a échoué. Veuillez réessayer.");
            }
        } catch (error) {
            Alert.alert("Erreur", "Une erreur s'est produite lors de l'inscription.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />

            <Logo style={{ marginTop: 85 }} />

            <Text style={styles.titre}>Welcome !</Text>

            <GoTextInput
                value={nom}
                placeholder="Nom"
                onChangeText={setNom}
            />

            <GoTextInput
                value={prenom}
                placeholder="Prenom"
                onChangeText={setPrenom}
            />

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
                <GoButton onPress={handleSignup} btnTxt="Inscription" />
                <GoButtonOutlined btnTxt="Connexion" onPress={() => navigation.navigate('GoLogin')} />
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

    keyboardAvoidingView: {
        flex: 1,
    }

});
