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

export default function GoSignup({ navigation }) {

	const fetchData = async () => {
		return fetch('http://localhost:5000/json')
			.then(response => response.json())
			.then(data => {
				console.log(data, "data")
			})
			.catch(error => {
				console.error(error);
			});
	}

	const [nom, setNom] = useState('');
	const [prenom, setPrenom] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

    const handleSignup = async () => {
		console.log('Nom:', nom);
		console.log('Prenom:', prenom);
		console.log('Email:', email);
		console.log('Mot de passe:', password);
	
		try {
			const response = await fetch('http://localhost:5000/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ nom, prenom, email, password })
			});
	
			const data = await response.json();
			console.log(data);
	
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="auto" />

			<Logo style={{marginTop: 85}}/>

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
				{/* <GoButtonOutlined btnTxt="Connexion" onPress={() => navigation.navigate("GoLogin")} /> */}
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
	}

});
