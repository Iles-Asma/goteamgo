import { View, Text, SafeAreaView, Platform, StyleSheet, StatusBar} from 'react-native'
import React from 'react';
import GoMenuTroisTabs from '../components/GoMenuTroisTabs'
import EntypoIcon from "react-native-vector-icons/Entypo"
import GoButton from '../components/GoButton';
import { FlatList } from 'react-native-gesture-handler';
import GoViewVoiture from '../components/GoViewVoiture';

export default function GoDispoVoitures() {


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titre}>Voitures disponibles</Text>

      <GoMenuTroisTabs style={styles.GoMenuTroisTabs}></GoMenuTroisTabs>


      <View style={styles.btnStyle}>

        <GoViewVoiture nomTxt="Nathalie DUPONT" placeTxt="3 places"></GoViewVoiture>

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
        width: 350,
        fontSize: 35,
        marginTop: 50,
        marginLeft: 10
    },

    GoMenuTroisTabs:{
        width: 375,
        height: 20,
        marginTop: 20
    }
})