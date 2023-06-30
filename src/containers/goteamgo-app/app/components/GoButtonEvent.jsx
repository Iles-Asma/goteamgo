import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export default function GoButtonEvent(props) {
	return (
		<TouchableOpacity style={{...styles.touchable, ...props.style}} onPress={props.onPress}>
			<View style={styles.btnContainer}>
				<Text style={styles.btnTxt}>{props.btnTxt}</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	touchable: {
		borderRadius: 10,
		width: 325,
		height: 52,
	},
	btnTxt: {
		textAlignVertical: "center",
		textAlign: "center",
		color: "#79BFFF",
	},

	btnContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

