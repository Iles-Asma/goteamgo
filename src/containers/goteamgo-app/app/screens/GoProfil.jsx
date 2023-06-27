import { StyleSheet, Text, View, StatusBar, SafeAreaView, Platform } from 'react-native'
import React from 'react'

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
      <Text>Prénom</Text>
      <Text>Email</Text>
      <Text>Mot de passe</Text>
      <Text>Rejoindre une organisation</Text>
      <Text>Mes organisations</Text>

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