import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { GOTEAMGO } from "../themes/Gotheme"

export default function GoButtonOutlined(props) {
    return (
        <TouchableOpacity style={styles.touchable} onPress={props.onPress}>
            <View style={styles.btnContainer}>
                <Text style={styles.txtBtn}>{props.btnTxt}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    touchable: {
        borderRadius: 15,
        width: 350,
        height: 61,
        borderWidth: 3,
        borderColor: GOTEAMGO.primary,
    },
    txtBtn: {
        textAlignVertical: "center",
        textAlign: "center",

        textAlign: 'center',
        color: GOTEAMGO.primary,
    },
    btnContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
