import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	StatusBar,
	Platform,
	TextInput
} from "react-native";
import React, { useState } from "react";
import GoButton from '../components/GoButton';
import GoTextInput from "../components/GoTextInput";
import GoButtonOutlined from "../components/GoButtonOutlined";
import Logo from "../../assets/svg/Logo";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GoLogin({ navigation }) {

	IP = os.environ.get("HOST_IP")

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async () => {
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
                navigation.navigate('Home'); // Changez 'Home' par le nom de votre écran d'accueil
            } else {
                // Gérer l'échec de la connexion
            }
        } catch (error) {
            // Gérer les erreurs de requête
        }
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="auto" />

			<Logo style={{marginTop: 85}}/>

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

				{/* <GoButtonOutlined btnTxt="S'inscrire" onPress={() => navigation.navigate('GoSignup')} /> */}
				<GoButtonOutlined btnTxt="S'inscrire" onPress={() => navigation.navigate('GoSignup')} />
			</View>
		</SafeAreaView >
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

	input: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 16,
		paddingHorizontal: 10,
	},

	input: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 16,
		paddingHorizontal: 10,
	},
});
