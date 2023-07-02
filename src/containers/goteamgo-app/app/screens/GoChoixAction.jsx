import { View, Text, SafeAreaView, Platform, StyleSheet, StatusBar, TouchableOpacity  } from 'react-native'
import React, { useEffect } from 'react'
import GoButton from '../components/GoButton'
import GoButtonOutlined from '../components/GoButtonOutlined'
import Icon from 'react-native-vector-icons/Ionicons';

export default function GoChoixAction({ navigation, route }) {

    const { eventId, token } = route.params;

    useEffect(() => {
      // Utilisez eventId et token ici
      console.log(eventId);
      console.log(token);
    }, []);

    return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 50, position: 'absolute', left: 20 }}>
          <Icon name="chevron-back" size={40} style={{position: 'absolute', color: '#79BFFF' }}/>
        </TouchableOpacity>
        <Text style={styles.titre}>Que souhaitez vous ?</Text>

        <View style={styles.btnEspace}>
            <GoButton onPress={() => navigation.navigate('GoCreerAnnonce', { eventId: eventId, token: token})} btnTxt="Partager ma voiture" />
            <GoButtonOutlined onPress={() => navigation.navigate('GoDispoVoitures', { eventId: eventId, token: token})} btnTxt="Trouver une voiture"/>
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
    }
})