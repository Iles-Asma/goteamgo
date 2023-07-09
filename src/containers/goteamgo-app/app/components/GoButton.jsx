import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { GOTEAMGO } from "../themes/Gotheme"

export default function GoButton(props) {
	return (
		<TouchableOpacity style={styles.touchable} onPress={props.onPress}>
			<View style={styles.btnContainer}>
				<Text style={styles.btnTxt}>{props.btnTxt}</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	touchable: {
		borderRadius: 15,
		width: 350,
		height: 61,
		backgroundColor: GOTEAMGO.primary,
	},
	btnTxt: {
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
