import { View, Text, SafeAreaView, Platform, StyleSheet, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react';
import GoMenuTroisTabs from '../components/GoMenuTroisTabs'
import EntypoIcon from "react-native-vector-icons/Entypo"
import GoStepper from '../components/GoStepper'
import GoButton from '../components/GoButton';
import QuantityInput from '../components/QuantityButton';

export default function GoCreerAnnonce({ route }) {

  const { eventId, token } = route.params;

  const handleCreateAd = async () => {
    try {
  
      const response = await fetch(`http://${IP}:5000/create_ad`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_id: eventId,
          direction: selectedSection, // 'Aller', 'Retour' ou 'Aller-retour'
          seats_available_aller: (selectedSection === 'Aller' || selectedSection === 'Aller-retour') ? stepperValue : null,
          seats_available_retour: (selectedSection === 'Retour' || selectedSection === 'Aller-retour') ? stepperValue : null,
        })
      });
  
      const data = await response.json();
      console.log(data);
  
    } catch (error) {
      console.error('Erreur lors de la création de l\'annonce:', error);
    }
  };

  const [stepperValue, setStepperValue] = useState(0);
  const handleStepperChange = (value) => {
    setStepperValue(value);
    console.log('Valeur du stepper :', value);
  };

  const [selectedSection, setSelectedSection] = useState("Aller"); // Trajet "Aller" activé par défaut
  const handleSectionChange = (sectionName) => {
    setSelectedSection(sectionName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Créer une annonce</Text>

      <GoMenuTroisTabs
        style={styles.GoMenuTroisTabs}
        selectedSection={selectedSection}
        onSectionChange={handleSectionChange}
      />

      {selectedSection === 'Aller' && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            ALLER
          </Text>
          <View style={styles.stepperInput}>
            <GoStepper onChange={handleStepperChange} />
          </View>
        </View>
      )}

      {selectedSection === 'Retour' && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            RETOUR
          </Text>
          <View style={styles.stepperInput}>
            <GoStepper onChange={handleStepperChange} />
          </View>
        </View>
      )}

      {selectedSection === 'Aller-retour' && (
        <View style={styles.sectionContainer}>
          <View style={styles.subSection}>
            <Text style={styles.subSectionTitle}>
              ALLER
            </Text>
            <View style={styles.stepperInput}>
              <GoStepper onChange={handleStepperChange} />
            </View>
          </View>
          <View style={styles.subSection}>
            <Text style={styles.subSectionTitle}>
              RETOUR
            </Text>
            <View style={styles.stepperInput}>
              <GoStepper onChange={handleStepperChange} />
            </View>
          </View>
        </View>
      )}

      <View style={styles.btnStyle}>
        <GoButton btnTxt="Ajouter l'annonce" onPress={handleCreateAd}/>
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
    marginTop: 60,
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
    marginLeft: 20,
    marginTop: 70
  },

  sectionTitle: {
    fontSize: 20,
    marginRight: 10,
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
