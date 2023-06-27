import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	StatusBar,
	Platform,
	TextInput
} from "react-native";
import React from "react";

export default function GoLogin({ navigation }) {

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

	const handleLogin = async () => {
		console.log('Email:', email);
		console.log('Mot de passe:', password);

		try {
			const response = await fetch('http://localhost:5000/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password })
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

			<Logo />

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

			<GoButton onPress={fetchData} btnTxt="Connexion" />
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
		gap: 10
	},

});
