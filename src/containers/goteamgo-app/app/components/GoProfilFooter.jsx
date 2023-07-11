import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import GoButtonOffline from '../components/GoButtonOffline';

export default function GoProfilFooter({ logout }) {
	return (
        <View style={{marginTop: 25}}>
        <GoButtonOffline onPress={logout} btnTxt="Deconnexion" />
      </View>
	);
}