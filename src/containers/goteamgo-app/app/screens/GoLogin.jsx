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

			<TextInput
				style={styles.input}
				placeholder="Email"
				onChangeText={(text) => setEmail(text)}
				value={email}
			/>
			<TextInput
				style={styles.input}
				placeholder="Mot de passe"
				onChangeText={(text) => setPassword(text)}
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

	input: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 16,
		paddingHorizontal: 10,
	  },
});
