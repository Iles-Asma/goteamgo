import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export default function GoButton(props) {
	return (
		<TouchableOpacity style={props.styles}>
			<View style={styles.btnContainer}>
				<Text style={styles.txtBtn}>{props.textButton}</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	touchable: {
		borderRadius: 15,
		width: 295,
		height: 61,
		backgroundColor: "#79BFFF",
	},
	txtBtn: {
		textAlignVertical: "center",
		textAlign: "center",
		color: "#FFFFFF",
	},

	btnContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
