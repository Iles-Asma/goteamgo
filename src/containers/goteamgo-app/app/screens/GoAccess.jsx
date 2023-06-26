import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

import GoButton from '../components/GoButton';
import GoButtonOutlined from '../components/GoButtonOutlined';

export default function GoAccess() {

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
        <SafeAreaView>
            <GoButton onPress={fetchData} btnTxt="Se connecter" />
            <GoButtonOutlined />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    touchable: {
        borderRadius: 15,
        width: 295,
        height: 61,
        backgroundColor: "#79BFFF",
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnSpace: {
        paddingBottom: 10,
    }
});