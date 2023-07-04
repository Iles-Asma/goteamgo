import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, StatusBar, Platform, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';

const GoDetailVoiture = ({ navigation, route }) => {
    const { eventId, token, carId, userName } = route.params;

    const [carDetails, setCarDetails] = useState(null);
    const [ID, setID] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [hasReserved, setHasReserved] = useState(false);

    const IP = "localhost";

    const fetchCarDetails = async () => {
        try {
            const response = await fetch(`http://${IP}:5000/seats_available/${carId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (response.ok) {
                setCarDetails(data);
            }
        } catch (error) {
            console.error('Error fetching car details:', error);
        }
    };

    const fetchUserInfo = async () => {
        try {
            const response = await fetch(`http://${IP}:5000/user_info`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            if (response.ok) {
                setID(data.user_id);
                setNom(data.nom);
                setPrenom(data.prenom);
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    const fetchExistingReservations = async () => {
        try {
            const response = await fetch(`http://${IP}:5000/get_reservations/${carId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();

            if (response.ok) {
                if (Array.isArray(data.reservations)) {
                    setReservations(data.reservations);
                } else {
                    console.error('Unexpected response format:', data);
                }
            } else {
                console.error('Failed to fetch existing reservations:', data);
            }
        } catch (error) {
            console.error('Error fetching existing reservations:', error);
        }
    };

    useEffect(() => {
        fetchCarDetails();
        fetchUserInfo();
        fetchExistingReservations();
    }, []);


const handleDeleteReservation = async (reservationId) => {
    try {
        const response = await fetch(`http://${IP}:5000/delete_reservation/${reservationId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            // Rafraîchir les réservations existantes après la suppression
            fetchExistingReservations();
        } else {
            console.error('Failed to delete reservation.');
            Alert.alert('Erreur lors de la suppression de la réservation.');
        }
    } catch (error) {
        console.error('Error deleting reservation:', error);
    }
};


const handleReservation = async () => {
    try {
        // Fetch car details
        await fetchCarDetails();

        // Ajout de la vérification pour s'assurer que l'utilisateur ne réserve pas de place dans sa propre voiture
        if (carDetails && carDetails.owner_id === ID) {
            Alert.alert("Vous ne pouvez pas réserver une place dans votre propre voiture.");
            return;
        }
        // Vérifier si l'utilisateur a déjà réservé une place
        const existingReservation = reservations.find(reservation => reservation.user_id === ID);
        if (existingReservation) {
            Alert.alert("Vous avez déjà réservé une place.");
            return;
        }
    
        const response = await fetch(`http://${IP}:5000/create_reservation`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: ID,
                car_share_id: carId,
                seats_reserved_aller: 1,
                seats_reserved_retour: 1
            })
        });
    
        const data = await response.json();
    
        if (response.ok) {
            fetchExistingReservations();
            fetchCarDetails();
            setHasReserved(true);
        } else {
            console.error('Failed to create reservation:', data);
            Alert.alert('Erreur lors de la création de la réservation:', data.message);
        }
    } catch (error) {
        console.error('Error creating reservation:', error);
    }
};

    
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 50, position: 'absolute', left: 20 }}>
                <Icon name="chevron-back" size={40} style={{ position: 'absolute', color: '#79BFFF' }} />
            </TouchableOpacity>
            <View style={styles.content}>
                <Text style={styles.title}>Détail</Text>
    
                <View style={styles.driverContainer}>
                    <MaterialCommunityIcons name="car" color="#ffffff" size={30} />
                    <Text style={styles.driverName}>{userName}</Text>
                </View>
    
                <View style={styles.reservationsContainer}>
                {Array.isArray(reservations) && reservations.map((reservation, index) => (
                    <View key={index} style={styles.reservationItem}>
                        <MaterialCommunityIcons name="account" color="#79BFFF" size={30} />
                        <Text style={styles.reservationUserName}>
                            {reservation.nom} {reservation.prenom}
                        </Text>
                        {/* Ne montrer l'icône de poubelle que si l'utilisateur n'est pas l'hôte de la voiture */}
                        {carDetails && reservation.user_id === ID && (
                <TouchableOpacity onPress={() => handleDeleteReservation(reservation.id)} style={styles.deleteButton}>
                    <MaterialCommunityIcons name="trash-can" color="red" size={25} />
                </TouchableOpacity>
            )}
        </View>
    ))}
</View>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={handleReservation}>
                <MaterialCommunityIcons name="plus-thick" color="#79BFFF" size={50} />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight : 40,
        backgroundColor: "#ffffff",
    },
        deleteButton: {
        marginLeft: 'auto',
    },
    content: {
        flex: 1,
        alignItems: "center",
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
    driverContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "#79BFFF",
        padding: 10,
        width: "90%",
        marginBottom: 20
    },
    driverName: {
        paddingLeft: 20,
        fontSize: 17,
        color: "#ffffff"
    },
    reservationsContainer: {
        width: '90%',
        marginTop: 20,
        flex: 1
    },
    reservationItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#F2F2F2",
        borderRadius: 10,
        marginBottom: 10
    },
    reservationUserName: {
        paddingLeft: 20,
        fontSize: 15
    },
    addButton: {
        padding: 10,
        width: "100%",
        borderWidth: 3,
        borderColor: "#79BFFF",
        borderRadius: 20,
        alignItems: "center",
        backgroundColor: "#F2F2F2"
    }
});


export default GoDetailVoiture;
