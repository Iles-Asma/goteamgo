import { View, Text, SafeAreaView, Platform, StyleSheet, StatusBar} from 'react-native'
import React from 'react';
import GoMenuTroisTabs from '../components/GoMenuTroisTabs'
import EntypoIcon from "react-native-vector-icons/Entypo"
import GoStepper from '../components/GoStepper'
import GoButton from '../components/GoButton';

export default function GoCreerAnnonce() {



  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.titre}>Créer une annonce</Text>

      <Text style={styles.titreSection}>Trajet</Text>

      <GoMenuTroisTabs style={styles.GoMenuTroisTabs}></GoMenuTroisTabs >

      <Text style={styles.titreSection}>ALLER <EntypoIcon name="chevron-thin-right" style={styles.icon}></EntypoIcon> Nombre de place</Text>
      <GoStepper></GoStepper>

      <Text style={styles.titreSection}>RETOUR <EntypoIcon name="chevron-thin-right" style={styles.icon}></EntypoIcon> Nombre de place</Text>
      <GoStepper></GoStepper>

      <View style={styles.btnStyle} >
        <GoButton btnTxt="Ajouter l'annonce"/>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight : 40,
      flexDirection: "column",
      alignItems: "left",
      backgroundColor: "#ffffff",
      gap:10
    },

    btnStyle: {
      flex: 2,
      flexDirection: "column",

      marginTop: 10,
      alignItems: "center",
    },

    titre: {
        color: "#121212",
        fontWeight: 'bold',
        height: 40,
        width: 330,
        fontSize: 35,
        marginTop: 159,
        marginLeft: 10
    },

    GoMenuTroisTabs:{
        width: 375,
        height: 20,
        marginTop: 10
    },

    titreSection: {
        height: 20,
        marginLeft: 20,
        fontSize: 20,
        marginTop: 20
    },

    icon: {
        fontSize: 20
    }
})