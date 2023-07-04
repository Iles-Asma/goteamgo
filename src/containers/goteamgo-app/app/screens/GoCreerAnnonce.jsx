import { View, Text, SafeAreaView, Platform, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import GoMenuTroisTabs from '../components/GoMenuTroisTabs';
import EntypoIcon from "react-native-vector-icons/Entypo";
import GoStepper from '../components/GoStepper';
import GoButton from '../components/GoButton';
import QuantityInput from '../components/QuantityButton';
import Icon from 'react-native-vector-icons/Ionicons';

export default function GoCreerAnnonce({ navigation, route }) {
  const { eventId, token } = route.params;
  const IP = "192.168.1.120";

  const [stepperValueAller, setStepperValueAller] = useState(0);
  const [stepperValueRetour, setStepperValueRetour] = useState(0);
  const [selectedSection, setSelectedSection] = useState("Aller");

  const handleStepperChangeAller = (value) => {
    setStepperValueAller(value);
    console.log('Valeur du stepper aller:', value);
  };

  const handleStepperChangeRetour = (value) => {
    setStepperValueRetour(value);
    console.log('Valeur du stepper retour:', value);
  };

  const handleStepperChangeAllerRetour = (value) => {
    setStepperValueAller(value);
    setStepperValueRetour(value);
    console.log('Valeur du stepper aller-retour:', value);
  };

  const handleSectionChange = (sectionName) => {
    setSelectedSection(sectionName);
  };

  const handleCreateAd = async () => {
    try {
      const body = {
        event_id: eventId,
        direction: selectedSection,
        seats_available_aller: (selectedSection === 'Aller' || selectedSection === 'Aller-retour') ? stepperValueAller : null,
        seats_available_retour: (selectedSection === 'Retour' || selectedSection === 'Aller-retour') ? stepperValueRetour : null,
      };
  

      const response = await fetch(`http://${IP}:5000/create_carshare`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log(data);
      navigation.navigate('GoThanksShareCar', { eventId: eventId, token: token});

    } catch (error) {
      console.error('Erreur lors de la création de l\'annonce:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 50, position: 'absolute', left: 20 }}>
          <Icon name="chevron-back" size={40} style={{position: 'absolute', color: '#79BFFF' }}/>
        </TouchableOpacity>
      <Text style={styles.title}>Créer une annonce</Text>

      <GoMenuTroisTabs
        style={styles.GoMenuTroisTabs}
        selectedSection={selectedSection}
        onSectionChange={handleSectionChange}
      />

      {selectedSection === 'Aller' && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}></Text>
          <View style={styles.stepperInput}>
            <GoStepper onChange={handleStepperChangeAller} />
          </View>
        </View>
      )}

      {selectedSection === 'Retour' && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}></Text>
          <View style={styles.stepperInput}>
            <GoStepper onChange={handleStepperChangeRetour} />
          </View>
        </View>
      )}

      {selectedSection === 'Aller-retour' && (
  <View style={styles.sectionContainer}>
    <View style={styles.subSection}>
      <Text style={styles.subSectionTitle}></Text>
      <View style={styles.stepperInput}>
        <GoStepper onChange={handleStepperChangeAllerRetour} />
      </View>
    </View>
  </View>
)}

      <View style={styles.btnStyle}>
        <GoButton btnTxt="Ajouter l'annonce" onPress={handleCreateAd} />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight : 40,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ffffff",
    gap: 10,
  },

  btnStyle: {
    flex: 2,
    flexDirection: "column",
    marginTop: 40,
    alignItems: "center",
  },

  title: {
    color: "#121212",
    fontWeight: 'bold',
    width: 350,
    fontSize: 30,
    marginTop: 70,
    marginBottom: 20,
  },

  GoMenuTroisTabs: {
    width: 410,
    height: 80,
    marginTop: 10
  },

  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 70
  },

  sectionTitle: {
    fontSize: 20,
    marginTop: 10
  },

  subSection: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 20
  },

  subSectionTitle: {
    fontSize: 20,
    marginTop: 10
  },

  stepperInput: {
    marginTop: 10,
  }
});
