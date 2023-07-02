import { View, Text, SafeAreaView, Platform, StyleSheet, StatusBar } from 'react-native'
import React, { useState } from "react";
import GoButton from '../components/GoButton'
import GoTextInput from "../components/GoTextInput";

export default function GoCreateEvent() {

  const IP = "localhost"

    const [nom, setNom] = useState('');
    const [categorie, setCategorie] = useState('');
    const [lieu, setLieu] = useState('');
    const [date, setDate] = useState('');

    const handleCreate = async () => {
	
		try {
			const response = await fetch(`http://${IP}:5000/create_event`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ nom, categorie, lieu, date })
			});
	
			const data = await response.json();
			console.log(data);
	
		} catch (error) {
			console.error('Error:', error);
        };
      };
		

    return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Créer un événement</Text>

        <View style={{marginTop: 10}}>
        <GoTextInput
				value={nom}
				placeholder="Nom de l'événement"
				onChangeText={setNom}
			/>

        <GoTextInput
				value={categorie}
				placeholder="Catégorie"
				onChangeText={setCategorie}
			/>

        <GoTextInput
				value={lieu}
				placeholder="Lieu"
				onChangeText={setLieu}
			/>
        
        <GoTextInput
				value={date}
				placeholder="Date"
				onChangeText={setDate}
			/>

        <View style={styles.btnEspace}>
            <GoButton onPress={handleCreate} btnTxt="Créer l'événement" />
        </View>
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
      marginTop: 20
    },

    title: {
        color: "#121212",
        fontWeight: 'bold',
        width: 350,
        fontSize: 30,
        marginTop: 60,
        marginBottom: 20,
    }
})