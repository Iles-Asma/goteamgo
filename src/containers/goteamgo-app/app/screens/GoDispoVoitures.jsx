import { View, Text, SafeAreaView, Platform, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import GoMenuTroisTabs from '../components/GoMenuTroisTabs'
import EntypoIcon from "react-native-vector-icons/Entypo"
import GoButton from '../components/GoButton';
import { FlatList } from 'react-native-gesture-handler';
import GoViewVoiture from '../components/GoViewVoiture';
import Icon from 'react-native-vector-icons/Ionicons';
import { GOTEAMGO } from "../themes/Gotheme"
import { IP_ENV } from "@env";

export default function GoDispoVoitures({ navigation, route }) {

    const { eventId, token } = route.params;

    const [carShares, setCarShares] = useState([]);
    const [selectedDirection, setSelectedDirection] = useState('Aller');

    //const IP = "192.168.1.120";

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetch(`http://${IP_ENV}:5000/list_car_share/${eventId}`)
                .then(response => response.json())
                .then(data => {
                    setCarShares(data);
                })
                .catch(error => console.error('Erreur lors de la récupération des car shares:', error));
        });

        return unsubscribe;
    }, [navigation]);

    const handleDirectionChange = (newDirection) => {
        setSelectedDirection(newDirection);
    };

    const filteredCarShares = carShares.filter(carShare => {
        return carShare.direction === selectedDirection;
    }).sort((a, b) => {
        const seatsA = selectedDirection === 'Retour' ? a.seats_available_retour : a.seats_available_aller;
        const seatsB = selectedDirection === 'Retour' ? b.seats_available_retour : b.seats_available_aller;
        return seatsB - seatsA;
    });

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 50, position: 'absolute', left: 20 }}>
                <Icon name="chevron-back" size={40} style={{ position: 'absolute', color: GOTEAMGO.primary }} />
            </TouchableOpacity>
            <Text style={styles.titre}>Voitures disponibles</Text>

            <GoMenuTroisTabs
                style={styles.GoMenuTroisTabs}
                selectedSection={selectedDirection}
                onSectionChange={handleDirectionChange}
            />

            <FlatList
                data={filteredCarShares}
                renderItem={({ item }) => {
                    const seatsAvailable = selectedDirection === 'Retour' ? item.seats_available_retour : item.seats_available_aller;
                    const isSeatsAvailableZero = seatsAvailable === 0;
                    const textToShow = isSeatsAvailableZero ? "Plus disponible" : `${seatsAvailable} places`;

                    return (
                        <GoViewVoiture
                            onPress={() => navigation.navigate('GoDetailVoiture', { token: token, carId: item.id, userName: item.user_name })}
                            nomTxt={item.user_name}
                            placeTxt={textToShow}
                            placeTxtColor={isSeatsAvailableZero ? 'red' : '#63CA23'}
                            pointColor={isSeatsAvailableZero ? 'red' : '#63CA23'}
                        />
                    );
                }}
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
        gap: 10
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

    GoMenuTroisTabs: {
        width: 375,
        height: 20,
        marginTop: 20,
        marginBottom: 50
    }
})