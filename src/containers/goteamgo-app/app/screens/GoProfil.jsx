import { StyleSheet, Text, View, StatusBar, SafeAreaView, Platform, FlatList } from 'react-native'
import React, { useState } from 'react'
import GoTextInput from '../components/GoTextInput'
import GoButton from '../components/GoButton';

export default function GoProfil() {

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organisation, setOrganisation] = useState([]);

  const handleLogin = () => {
    // Fonction de gestion de la connexion ici
    console.log('Nom:', nom);
    console.log('Prenom:', prenom);
    console.log('Email:', email);
    console.log('Mot de passe:', password);

    alert("Votre profil a été mis à jour");
  };

  const renderOrganisation = ({ item }) => (
    <View>
      <Text>{item.name}</Text>
    </View>
  );

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

        <View style={styles.btnEspace}>
          <GoButton onPress={handleLogin} btnTxt="Modifier votre profil" />
        </View>

        <Text>Rejoindre une organisation</Text>
        <GoTextInput 
        value={organisation}
				onChangeText={setPassword}/>
        <GoButton onPress={""} btnTxt="OK" />

        <Text>Mes organisations</Text>

        <FlatList
          data={organisation}
          renderItem={renderOrganisation}
          keyExtractor={(item)=>item.id.toString()}
        />

      <FlatList
        data={organisation}
        renderItem={renderOrganisation}
        keyExtractor={(item) => item.id.toString()}
      />

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
    gap: 10
  },
})