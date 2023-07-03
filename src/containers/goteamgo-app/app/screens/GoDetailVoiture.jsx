import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, StatusBar, Platform } from 'react-native'
import React, {useEffect, useState} from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const GoDetailVoiture = ({ navigation, ...props }) => {
    const route = useRoute();
    const { eventId, token, carId  } = route.params;
    const [carDetails, setCarDetails] = useState(null);
    const [ nom, setNom ] = useState(null);
    const [ prenom, setPrenom ] = useState(null);
    const [ id, setId ] = useState(null);

    const IP = "localhost"

    useEffect(() => {
    const fetchData = async () => {
        try {
            // Fetch car details from the server
            const carDetailsResponse = await fetch(`http://${IP}:5000/seats_available/${carId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const carDetailsData = await carDetailsResponse.json();

            if (carDetailsResponse.ok) {
                setCarDetails(carDetailsData);
                console.log("Number of seats available:", carDetailsData.seats_available);
            } else {
                console.error('Failed to fetch car details:', carDetailsData);
            }

            // Fetch user info from the server
            const userInfoResponse = await fetch(`http://${IP}:5000/user_info`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            const userInfoData = await userInfoResponse.json();

            if (userInfoResponse.ok) {
                console.log(userInfoData)
                setNom(userInfoData.nom);
                setPrenom(userInfoData.prenom);
                setId(userInfoData.id);
            } else {
                console.error('Failed to fetch user info:', userInfoData);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);

    const handleReservation = async () => {
        // Obtenez l'ID de l'utilisateur connecté d'une manière ou d'une autre.
        const userId = 1
    
        try {
            const response = await fetch(`http://${IP}:5000/create_reservation`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: id,
                    car_share_id: carId,
                    seats_reserved_aller: 1,
                    seats_reserved_retour: 1
                })
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log('Reservation created successfully:', data);
            } else {
                console.error('Failed to create reservation:', data);
            }
        } catch (error) {
            console.error('Error creating reservation:', error);
        }
    };
    
    

    return (
        <SafeAreaView style={styles.container}>
                      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 50, position: 'absolute', left: 20 }}>
          <Icon name="chevron-back" size={40} style={{position: 'absolute', color: '#79BFFF' }}/>
        </TouchableOpacity>
            <View>
                <Text style={styles.title}>Détail</Text>
            </View>

            <View style={styles.carUserContainer}>
                <View style={styles.carUserItem} >
                    <MaterialCommunityIcons name="account" color="#79BFFF" size={50} />
                    <Text style={styles.carUser}>{props.name}Elon musk</Text>
                </View>
                <TouchableOpacity style={styles.btnBg} onPress={handleReservation}>
                    <MaterialCommunityIcons name="plus-thick" color="#79BFFF" size={50} />
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

export default GoDetailVoiture

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight : 40,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#ffffff",
        gap: 10

    },


    title: {
        color: "#121212",
        fontWeight: 'bold',
        height: 40,
        width: 330,
        fontSize: 30,
        marginTop: 60,
        marginBottom: 20
    },
    carUserContainer: {
        height: "auto",

        alignItems: "left",
        width: "90%"



    },
    carUserItem: {
        padding: 10,
        flexDirection: "row",
        alignItems: "center",

        borderRadius: 10,
        backgroundColor: "#F2F2F2",
        width: "100%",
        marginBottom: 20

    },
    carUser: {
        paddingLeft: 20,
        fontSize: 17
    },
    btnBg: {
        padding: 10,
        width: "100%",
        borderWidth: 3,
        borderColor: "#79BFFF",
        borderRadius: 20,
        alignItems: "center"

    }
})