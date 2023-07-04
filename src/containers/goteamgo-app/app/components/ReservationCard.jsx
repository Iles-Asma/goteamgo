import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReservationCard = ({ reservation }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.text}>{reservation.nom} {reservation.prenom}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'lightgray',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    text: {
        fontSize: 16,
    }
});

export default ReservationCard;
