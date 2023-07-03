import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/Ionicons';

export default function GoViewVoiture(props) {
  return (
    <TouchableOpacity style={styles.touchable} onPress={props.onPress}>
			<View style={styles.btnContainer}>
                <View style={styles.icone}>
                    <MaterialCommunityIcons name="car-side" color="#79BFFF" size={50}/>
                </View>
                <View style={styles.textes}>
                    <Text style={styles.nomTxt}>{props.nomTxt}</Text>
                    <Text style={styles.placeTxt}>{props.placeTxt}</Text>
                </View>
                <View >
                    <MaterialCommunityIcons name="checkbox-blank-circle" color="#63CA23" size={15}/>
                </View>
			</View>
	</TouchableOpacity>
  )
}

const styles = StyleSheet.create({
	touchable: {
		borderRadius: 15,
		width: 325,
		height: 61,
		backgroundColor: "#F2F2F2",
        marginTop: 10,
	},
	nomTxt: {
        fontWeight: 'bold',
		textAlignVertical: "center",
		textAlign: "center",
		color: "#000000",
	},

    placeTxt: {
        fontWeight: 'bold',
        textAlignVertical: "center",
		textAlign: "center",
        color: "#63CA23",
    },

	btnContainer: {
		flex: 1,
        flexDirection: "row",
		alignItems: "center",
        justifyContent: "space-around",
        padding: 20,
	},

    icone: {
        width: 50,
        height: 50
    },

    textes: {
        alignItems: "flex-start",
    },
});