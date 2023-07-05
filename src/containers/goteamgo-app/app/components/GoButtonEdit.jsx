import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export default function GoButtonEdit(props) {
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
		backgroundColor: "#E8E8E8",
	},
	btnTxt: {
		textAlignVertical: "center",
		textAlign: "center",
	},

	btnContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
