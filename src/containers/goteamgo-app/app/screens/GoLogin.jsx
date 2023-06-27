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

export default function GoLogin() {

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

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = () => {
		// Fonction de gestion de la connexion ici
		console.log('Email:', email);
		console.log('Mot de passe:', password);
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="auto" />
			<Text>Welcome Back !</Text>

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

			<GoButton onPress={handleLogin} btnTxt="Connexion" />
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
	},

});
