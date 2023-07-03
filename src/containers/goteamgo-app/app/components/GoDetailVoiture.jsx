import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const GoDetailVoiture = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>Détail</Text>
            </View>

            <View style={styles.carUserContainer}>
                <View style={styles.carUserItem} >
                    <MaterialCommunityIcons name="account" color="#79BFFF" size={50} />
                    <Text style={styles.carUser}>{props.name}Elon musk</Text>
                </View>
                <View style={styles.carUserItem} >
                    <MaterialCommunityIcons name="account" color="#79BFFF" size={50} />
                    <Text style={styles.carUser}>{props.name}Elon musk</Text>
                </View>
                <TouchableOpacity style={styles.btnBg} onPress={"navigation"}>
                    <MaterialCommunityIcons name="plus-thick" color="#79BFFF" size={50} />
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

export default GoDetailVoiture

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight : 40,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#ffffff",
        gap: 10

    },


    title: {
        color: "#121212",
        fontWeight: 'bold',
        height: 40,
        width: 330,
        fontSize: 30,
        marginTop: 60,
        marginBottom: 20
    },
    carUserContainer: {
        height: "auto",

        alignItems: "left",
        width: "90%"



    },
    carUserItem: {
        padding: 10,
        flexDirection: "row",
        alignItems: "center",

        borderRadius: 10,
        backgroundColor: "#F2F2F2",
        width: "100%",
        marginBottom: 20

    },
    carUser: {
        paddingLeft: 20,
        fontSize: 17
    },
    btnBg: {
        padding: 10,
        width: "100%",
        borderWidth: 3,
        borderColor: "#79BFFF",
        borderRadius: 20,
        alignItems: "center"

    }
})