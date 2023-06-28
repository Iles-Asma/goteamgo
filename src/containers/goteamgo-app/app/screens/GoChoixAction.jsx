import { View, Text, SafeAreaView, Platform, StyleSheet, StatusBar } from 'react-native'
import React from 'react'
import GoButton from '../components/GoButton'
import GoButtonOutlined from '../components/GoButtonOutlined'

export default function GoChoixAction() {



    return (
    <SafeAreaView style={styles.container}>

        <Text style={styles.titre}>Que souhaitez vous ?</Text>

        <View style={styles.btnEspace}>
            <GoButton onPress={""} btnTxt="Partager ma voiture" />
            <GoButtonOutlined btnTxt="Trouver une voiture"/>
        </View>

    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight : 40,
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#ffffff",
      gap:10
    },

    btnEspace: {
      gap: 10,
    },

    titre: {
        color: "#121212",
        fontWeight: 'bold',
        height: 40,
        width: 330,
        fontSize: 30,
        marginTop: 159,
        marginLeft: 18
    }
})