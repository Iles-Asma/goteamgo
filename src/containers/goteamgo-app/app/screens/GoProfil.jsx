import { StyleSheet, Text, View, StatusBar, SafeAreaView, Platform, FlatList, Alert  } from 'react-native'
import React, { useState, useEffect  } from 'react'
import GoTextInput from '../components/GoTextInput'
import GoButton from '../components/GoButton';
import GoButtonOffline from '../components/GoButtonOffline';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GoProfil({navigation}) {

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [codeOrganisation, setCodeOrganisation] = useState([]);
  const [nomOrganisation, setNomOrganisation] = useState([]);

  const logout = async () => {
    try {
      // Supprimer le token de l'AsyncStorage
      await AsyncStorage.removeItem('userToken');
      // Rediriger vers la page de connexion
      navigation.navigate('GoLogin');
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la déconnexion.');
      console.error(error);
    }
  };


  useEffect(() => {
    // Récupérer le token stocké localement

    const IP = "192.168.1.120"

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


const renderHeader = () => (
  <View>
    <Text style={styles.titre}>Mon compte</Text>
    <GoTextInput value={nom} onChangeText={setNom} />
    <GoTextInput value={prenom} onChangeText={setPrenom} />
    <GoTextInput value={email} onChangeText={setEmail} />

    <View style={styles.btnEspace}>
      <GoButton btnTxt="Sauvegarder" />
    </View>

    <Text style={{ marginTop: 30, marginBottom: 10, fontSize: 16 }}>Rejoindre une organisation</Text>
    <GoTextInput value={codeOrganisation} onChangeText={setCodeOrganisation} />
    <GoButton onPress={joinOrganization} btnTxt="OK" />

    <Text style={{ marginTop: 30, marginBottom: 10, fontSize: 16 }}>Mes organisations  : </Text>
  </View>
);

const renderFooter = () => (
  <View>
    <GoButtonOffline onPress={logout} btnTxt="Deconnexion" />
  </View>
);

const renderEmptyList = () => (
  <View>
    <Text style={{marginBottom: 30, fontSize: 14, color: "#7E7E7E" }}>Vous n'appartenez à aucune organisation.</Text>
  </View>
);

return (
  <SafeAreaView style={styles.container}>
  <StatusBar style="auto" />
  <FlatList
    ListHeaderComponent={renderHeader}
    data={nomOrganisation}
    renderItem={renderOrganisation}
    ListFooterComponent={renderFooter}
    ListEmptyComponent={renderEmptyList} // Ajoutez ceci
  />
</SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight : 0,
      backgroundColor: "#ffffff",
      alignItems: 'center'
  },
  contentContainer: {
      alignItems: "center",
      paddingTop: Platform.OS === "ios" ? 40 : StatusBar.currentHeight + 40,
  },
  titre: {
      color: "#121212",
      fontWeight: 'bold',
      height: 40,
      width: 350,
      fontSize: 30,
      marginTop: 20,
      marginBottom: 20
  }
});