import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import GoTextInput from '../components/GoTextInput';
import GoButton from '../components/GoButton';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GOTEAMGO } from "../themes/Gotheme"

export default function GoEditPassword({ navigation }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
    } else {

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;
      if (!passwordRegex.test(password)) {
        Alert.alert(
          'Erreur',
          'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.'
        );
        return;
      }

      try {
        const token = await AsyncStorage.getItem('userToken');
        const IP = "192.168.1.120";

        const response = await fetch(`http://${IP}:5000/update_password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ new_password: password })
        });

        const result = await response.json();

        if (response.status === 200) {
          Alert.alert('Succès', result.message);
          navigation.navigate('GoProfil')
        } else {
          Alert.alert('Erreur', result.message);
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour du mot de passe:', error);
        Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour du mot de passe');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('GoProfil')} style={styles.backButton}>
        <Icon name="chevron-back" size={40} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.titre}>Nouveau mot de passe</Text>
      <GoTextInput
        secureTextEntry
        placeholder="Nouveau mot de passe"
        value={password}
        onChangeText={setPassword}
      />
      <GoTextInput
        secureTextEntry
        placeholder="Confirmer le mot de passe"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <GoButton btnTxt="Sauvegarder" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  titre: {
    color: '#121212',
    fontWeight: 'bold',
    height: 40,
    width: 350,
    fontSize: 30,
    marginTop: 20,
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backIcon: {
    color: GOTEAMGO.primary,
  },
});
