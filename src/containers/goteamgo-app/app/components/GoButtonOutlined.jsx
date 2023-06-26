import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export default function GoButtonOutlined(props) {
    return (
        <TouchableOpacity style={styles.touchable}>
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
        borderWidth: 3,
        borderColor: "#79BFFF",
    },
    txtBtn: {
        textAlignVertical: "center",
        textAlign: "center",

        textAlign: 'center',
        color: "#79BFFF",
    },
    btnContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
