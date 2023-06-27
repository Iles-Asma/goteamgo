import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	StatusBar,
	Platform,
	TextInput
} from "react-native";
import React, {useState} from "react";
import GoButton from '../components/GoButton';
import GoTextInput from "../components/GoTextInput";
import GoButtonOutlined from "../components/GoButtonOutlined";
import Logo from "../../assets/svg/Logo";

export default function GoSignup() {

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

	const handleLogin = () => {
		// Fonction de gestion de la connexion ici
        console.log('Nom:', nom);
		console.log('Prenom:', prenom);
		console.log('Email:', email);
		console.log('Mot de passe:', password);
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="auto" />

			<Logo/>

			<Text>Welcome !</Text>

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
				<GoButton onPress={handleLogin} btnTxt="Inscription" />

				<GoButtonOutlined btnTxt="Connexion"/>
			</View>
		</SafeAreaView>	
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight : 40,
		flexDirection: "column",
		alignItems: "center",
		backgroundColor: "#ffffff",
		gap:10
	},

	btnEspace: {
		gap:10,
	}

});
