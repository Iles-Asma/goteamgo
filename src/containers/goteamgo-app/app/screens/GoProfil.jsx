import { StyleSheet, Text, View, StatusBar, SafeAreaView, Platform } from 'react-native'
import React, {useState} from 'react'
import GoTextInput from '../components/GoTextInput'

export default function GoProfil() {

  const [nom, setNom] = useState('');
	const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [organisation] = useState('');

  return (
    <SafeAreaView style={styles.containers}>
        <StatusBar style="auto" />

        <Text>Votre Profil</Text>

        <Text>Nom</Text>
        <GoTextInput 
        value={nom}
				onChangeText={setNom}/>

        <Text>Prénom</Text>
        <GoTextInput 
        value={prenom}
				onChangeText={setPrenom}/>

        <Text>Email</Text>
        <GoTextInput 
        value={email}
				onChangeText={setEmail}/>

        <Text>Mot de passe</Text>
        <GoTextInput 
        value={password}
				onChangeText={setPassword}
        secureTextEntry/>

        <Text>Rejoindre une organisation</Text>
        <GoTextInput 
        value={organisation}
				onChangeText={setPassword}/>

        <Text>Mes organisations</Text>

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
})