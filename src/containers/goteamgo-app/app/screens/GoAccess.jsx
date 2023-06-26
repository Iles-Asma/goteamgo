import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

import GoButton from '../components/GoButton'
import GoButtonOutlined from '../components/GoButtonOutlined'

export default function GoAccess() {




    return (

        <SafeAreaView>
            <View>
                <GoButton styles={styles.touchable} />
                <GoButtonOutlined />
            </View>

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
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnSpace: {
        paddingBottom: 10,

    }

})