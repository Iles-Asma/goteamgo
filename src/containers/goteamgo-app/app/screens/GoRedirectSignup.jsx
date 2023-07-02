import { View, Text, SafeAreaView, Platform, StyleSheet, StatusBar, Image } from 'react-native'
import React, { useEffect } from 'react'
import GoButton from '../components/GoButton'
import GoButtonOutlined from '../components/GoButtonOutlined'
import BravoImg from '../../assets/yes.png'

export default function GoRedirectionSignup({ navigation }) {

    return (
    <SafeAreaView style={styles.container}>

        <Text style={styles.titre}>Félicitations !</Text>
        <Text style={styles.paragraphe}>Votre inscription a été un succès. Bienvenue parmi nous !</Text>
        <Image source={require('../../assets/yes.png')} />
        <View style={styles.btnEspace}>
            <GoButton onPress={() => navigation.navigate('GoCreerAnnonce', { eventId: eventId, token: token})} btnTxt="Partager ma voiture" />
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
      gap: 15,
    },

    titre: {
        color: "#121212",
        fontWeight: 'bold',
        height: 40,
        width: 330,
        fontSize: 30,
        marginTop: 159,
        marginLeft: 18,
        marginBottom: 30
    }, 
    paragraphe: {
        color: "#121212",
        height: 40,
        width: 330,
        fontSize: 15,
        marginTop: 100,
        marginLeft: 18,
        marginBottom: 30
    }
})