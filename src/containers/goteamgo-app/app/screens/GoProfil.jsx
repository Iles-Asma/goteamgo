import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function GoProfil() {
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