import { StyleSheet, Text, View, StatusBar, SafeAreaView, Platform, FlatList, Alert  } from 'react-native'
import React, { useState, useEffect, useCallback  } from 'react'
import GoTextInput from '../components/GoTextInput'
import GoButton from '../components/GoButton';
import GoButtonOffline from '../components/GoButtonOffline';
import GoButtonEdit from '../components/GoButtonEdit';
import GoProfilFooter from '../components/GoProfilFooter';
import GoProfilHeader from '../components/GoProfilHeader';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP_ENV } from "@env";
import { Ionicons } from '@expo/vector-icons';

export default function GoProfil({navigation}) {

  //const IP = '192.168.1.120';

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [organisations, setOrganisations] = useState([]);
  const [codeOrganisation, setCodeOrganisation] = useState(''); // gardez-le pour rejoindre la fonctionnalité de l'organisation
  


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


  const fetchUserInfo = async () => {
    const token = await AsyncStorage.getItem('userToken');
    console.log(token)

    // Effectuer la requête HTTP pour récupérer les infos de l'utilisateur
    fetch(`http://${IP_ENV}:5000/user_info`, {
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
            setOrganisations(data.organisations);
        })
        .catch(error => console.error('Erreur lors de la récupération des infos de l\'utilisateur:', error));
};

useEffect(() => {
    fetchUserInfo();
}, []);

const joinOrganization = async () => {
  try {
      const token = await AsyncStorage.getItem('userToken');
      // Ici, remplacez l'URL et les paramètres en fonction de votre API pour rejoindre une organisation.
      const response = await fetch(`http://${IP_ENV}:5000/join_organization`, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              codeOrganisation: codeOrganisation // Assurez-vous d'envoyer le code de l'organisation de la manière attendue par votre API.
          })
      });

      const responseData = await response.json(); // Récupérer la réponse JSON du serveur
      
      if (response.status === 200) {
          fetchUserInfo();
      } else {
          console.error("Erreur lors de la tentative de rejoindre l'organisation", responseData.message);
      }

  } catch (error) {
      console.error("Error joining organization:", error);
  }
};

  

const updateProfile = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    const data = {
      nom: nom,
      prenom: prenom,
      email: email
    };

    fetch(`http://${IP_ENV}:5000/update_profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'Profile updated successfully') {
          Alert.alert('Succès', 'Profil mis à jour avec succès');
        } else {
          Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour du profil');
        }
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour du profil:', error);
        Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour du profil');
      });
  } catch (error) {
    console.error('Erreur lors de la récupération du token:', error);
    Alert.alert('Erreur', 'Une erreur est survenue lors de la récupération du token');
  }
};


const renderOrganisation = ({ item }) => {
  const handleDelete = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`http://${IP_ENV}:5000/delete_organization`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          organization_id: item.id // Remplacez item.id par l'ID de l'organisation à supprimer
        })
      });
  
      if (response.status === 200) {
        // Actualisez les informations de l'utilisateur après la suppression de l'organisation
        fetchUserInfo();
      } else {
        console.error("Erreur lors de la suppression de l'organisation");
      }
    } catch (error) {
      console.error("Error deleting organization:", error);
    }
  };
  return (
    <View style={styles.organisationContainer}>
      <Text style={styles.organisationName}>{item.nom}</Text>
      <Ionicons
        name="trash-outline"
        size={24}
        color="red"
        onPress={handleDelete}
      />
    </View>
  );
};


const renderHeader = useCallback(() => (
  <View>
    <Text style={styles.titre}>Mon compte</Text>
    <GoTextInput value={nom} onChangeText={setNom} />
    <GoTextInput value={prenom} onChangeText={setPrenom} />
    <GoTextInput value={email} onChangeText={setEmail} />

    <View style={styles.btnEspace}>
      <GoButtonEdit btnTxt="Modifier votre mot de passe" onPress={() => navigation.navigate('GoEditPassword')}/>
    </View>

    <View style={styles.btnEspace}>
      <GoButton btnTxt="Sauvegarder" onPress={updateProfile}/>
    </View>

    <Text style={{ marginTop: 30, marginBottom: 10, fontSize: 16 }}>Rejoindre une organisation</Text>
    <GoTextInput value={codeOrganisation} onChangeText={setCodeOrganisation} autoCorrect={false} autoFocus/>
    <GoButton onPress={joinOrganization} btnTxt="OK" />

    <Text style={{ marginTop: 30, marginBottom: 10, fontSize: 16 }}>Mes organisations  : </Text>
  </View>
), [nom, prenom, email, codeOrganisation, navigation]);

const renderFooter = useCallback(() => (
  <View style={{marginTop: 25}}>
    <GoButtonOffline onPress={logout} btnTxt="Deconnexion" />
  </View>
), [logout]);

const renderEmptyList = () => (
  <View>
    <Text style={{fontSize: 14, color: "#7E7E7E" }}>Vous n'appartenez à aucune organisation.</Text>
  </View>
);

return (
  <SafeAreaView style={styles.container}>
  <StatusBar style="auto" />
  <FlatList
  showsVerticalScrollIndicator={false}
  ListHeaderComponent={renderHeader}
  data={organisations} // Passer le tableau d'organisations ici
  renderItem={renderOrganisation}
  ListFooterComponent={renderFooter}
  ListEmptyComponent={renderEmptyList}
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
  },
  btnEspace: {
    marginBottom: 10,
  },
  organisationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  organisationName: {
    fontSize: 16,
  },
});