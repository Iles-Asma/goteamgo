import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Platform } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import Logo from '../../assets/svg/Logo';

import GoButton from '../components/GoButton';
import GoButtonOutlined from '../components/GoButtonOutlined';

<<<<<<< HEAD
export default function GoAccess({ navigation }) {
=======
export default function GoAccess(props) {
>>>>>>> g-iles

    const fetchData = async () => {
        return fetch('http://localhost:5000/json')
            .then(response => response.json())
            .then(data => {
                console.log(data, "data")
            })
            .catch(error => {
                console.error(error);
            });

    }

    return (
        <SafeAreaView style={styles.container} >
            {/* affiche la bar de status ( battery et heure) */}
            <StatusBar style='auto' />

            <Logo />

            <View style={styles.spacing}>
<<<<<<< HEAD
                <GoButton onPress={() => navigation.navigate('GoLogin')} btnTxt="Se connecter" />
                <GoButtonOutlined btnTxt="S'inscrire" />
=======
                <GoButton onPress={() => props.navigation.navigate('GoLogin')} btnTxt="Se connecter" />
                <GoButtonOutlined btnTxt="S'inscrire" onPress={() => props.navigation.navigate('GoSignup')} />
>>>>>>> g-iles

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // test pour detecter la platform
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    spacing: {
        gap: 25,
    },
    logo: {
        position: 'absolute',
        top: 200,
    }

});