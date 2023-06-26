import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	StatusBar,
	Platform,
} from "react-native";
import React from "react";

export default function GoLogin() {
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="auto" />
			<Text>Ecean de connexion</Text>
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
