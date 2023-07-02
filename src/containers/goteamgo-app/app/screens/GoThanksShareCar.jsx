import { View, Text, SafeAreaView, Platform, StyleSheet, StatusBar, Image } from 'react-native'
import React, { useEffect } from 'react'
import GoButton from '../components/GoButton'
import GoButtonOutlined from '../components/GoButtonOutlined'

export default function GoThanksShareCar({ navigation }) {

    return (
    <SafeAreaView style={styles.container}>
        <Image
  style={styles.image} // spécifiez les dimensions souhaitées de l'image
  source={require('../../assets/clap.png')}
  resizeMode="contain" // ou "cover" selon vos besoins
/>
        <Text style={styles.titre}>Félicitations !</Text>
        <Text style={styles.paragraphe}>Merci d'avoir partagé votre voiture ! Vous avez rendu le trajet de quelqu'un plus agréable.</Text>
        <View style={styles.btnEspace}>
            <GoButton onPress={() => navigation.navigate('GoDispoVoitures')} btnTxt="Liste des véhicules" />
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

    image: {
        height: 100,
        width: 100,
        marginTop: 120
    },

    titre: {
        color: "#121212",
        fontWeight: 'bold',
        height: 40,
        width: 330,
        fontSize: 30,
        marginTop: 60,
        marginLeft: 18,
    }, 
    paragraphe: {
        color: "#121212",
        height: 40,
        width: 330,
        fontSize: 15,
        marginLeft: 18,
        marginBottom: 40
    }
})