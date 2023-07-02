import { StyleSheet, Text, View, StatusBar, SafeAreaView, Platform, FlatList } from 'react-native'
import React, { useState, useEffect  } from 'react'
import GoTextInput from '../components/GoTextInput'
import GoButton from '../components/GoButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GoProfil() {

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [codeOrganisation, setCodeOrganisation] = useState([]);
  const [nomOrganisation, setNomOrganisation] = useState([]);


  useEffect(() => {
    // Récupérer le token stocké localement

    const IP = "localhost"

    const fetchUserInfo = async () => {
      const token = await AsyncStorage.getItem('userToken');
      console.log(token)
      
      // Effectuer la requête HTTP pour récupérer les infos de l'utilisateur
      fetch(`http://${IP}:5000/user_info`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(data => {
        // Mettre à jour les states avec les données reçues
        setNom(data.nom);
        setPrenom(data.prenom);
        setEmail(data.email);
        setNomOrganisation(data.nom_organization)
        setCodeOrganisation(data.code_organization)
        setPassword(''); // Vous ne devriez normalement pas recevoir le mot de passe
      })
      .catch(error => console.error('Erreur lors de la récupération des infos de l\'utilisateur:', error));
    };

    fetchUserInfo();
  }, []); // Le tableau vide signifie que cela s'exécutera une fois lorsque le composant est monté

  const renderOrganisation = ({ item }) => (
    <View>
      <Text>{item.name}</Text>
    </View>
  );


  const joinOrganization = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken'); // Vous devez obtenir ceci après la connexion de l'utilisateur
        const response = await fetch('http://localhost:5000/join_organization', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ codeOrganisation }),
        });

        const data = await response.json();
        console.log('Réponse du serveur:', data);
        console.log('organization_code:', data.organization_code);
        
    } catch (error) {
        console.error("Error joining organization:", error);
    }
};


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.titre}>Mon compte</Text>

        <GoTextInput 
        value={nom}
				onChangeText={setNom}/>

        <GoTextInput 
        value={prenom}
				onChangeText={setPrenom}/>

        <GoTextInput 
        value={email}
				onChangeText={setEmail}/>


        <View style={styles.btnEspace}>
          <GoButton btnTxt="Sauvegarder les modifications" />
        </View>

        <Text style={{marginTop: 30}}>Rejoindre une organisation</Text>
        <GoTextInput 
        value={codeOrganisation}
				onChangeText={setCodeOrganisation}/>
        <GoButton onPress={joinOrganization} btnTxt="OK" />


        <Text>Mes organisations</Text>

        <Text>{nomOrganisation}</Text>

        <FlatList
          data={nomOrganisation}
          renderItem={renderOrganisation}
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

  titre: {
    color: "#121212",
    fontWeight: 'bold',
    height: 40,
    width: 350,
    fontSize: 30,
    marginTop: 60,
marginBottom: 20
}
})