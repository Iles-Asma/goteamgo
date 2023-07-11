import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import GoTextInput from '../components/GoTextInput'
import GoButtonEdit from "./GoButtonEdit";
import GoButton from "./GoButton";

export default function GoProfilHeader({ nom, setNom, prenom, setPrenom, email, setEmail, updateProfile, joinOrganization }) {
	return (
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
	);
}

const styles = StyleSheet.create({
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
    }
  });