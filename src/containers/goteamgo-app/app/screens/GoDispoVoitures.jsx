import { View, Text, SafeAreaView, Platform, StyleSheet, StatusBar,TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react';
import GoMenuTroisTabs from '../components/GoMenuTroisTabs'
import EntypoIcon from "react-native-vector-icons/Entypo"
import GoButton from '../components/GoButton';
import { FlatList } from 'react-native-gesture-handler';
import GoViewVoiture from '../components/GoViewVoiture';
import Icon from 'react-native-vector-icons/Ionicons';

export default function GoDispoVoitures({navigation}) {
  
  const [carShares, setCarShares] = useState([]);
  const [selectedDirection, setSelectedDirection] = useState('Aller');

  const IP = "10.49.34.144";

  useEffect(() => {
      fetch(`http://${IP}:5000/list_car_share`)
          .then(response => response.json())
          .then(data => setCarShares(data))
          .catch(error => console.error('Erreur lors de la récupération des car shares:', error));
  }, []);

  const handleDirectionChange = (newDirection) => {
    setSelectedDirection(newDirection);
  };

  const filteredCarShares = carShares.filter(carShare => {
    return carShare.direction === selectedDirection;
  });

  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 50, position: 'absolute', left: 20 }}>
            <Icon name="chevron-back" size={40} style={{ position: 'absolute', color: '#79BFFF' }} />
        </TouchableOpacity>
        <Text style={styles.titre}>Voitures disponibles</Text>

        <GoMenuTroisTabs
          style={styles.GoMenuTroisTabs}
          selectedSection={selectedDirection}
          onSectionChange={handleDirectionChange}
        />

<FlatList
    data={filteredCarShares}
    renderItem={({ item }) => (
        <GoViewVoiture
            nomTxt={item.user_name}
            placeTxt={`${selectedDirection === 'Retour' ? item.seats_available_retour : item.seats_available_aller} places`}
        />
    )}
    keyExtractor={item => item.id.toString()}
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
      gap:10
    },

    btnStyle: {
      flex: 2,
      flexDirection: "column",
      marginTop: 10,
      alignItems: "center",
      marginLeft: 25
    },

    titre: {
        color: "#121212",
        fontWeight: 'bold',
        height: 40,
        width: 350,
        fontSize: 35,
        marginTop: 70,
        marginLeft: 25
    },

    GoMenuTroisTabs:{
        width: 375,
        height: 20,
        marginTop: 20,
        marginBottom: 50
    }
})