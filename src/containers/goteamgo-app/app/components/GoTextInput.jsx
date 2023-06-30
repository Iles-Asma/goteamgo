import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

export default function GoTextInput(props) {
    return (
        <View>
            <TextInput
                style={styles.input}
                value={props.value}
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}
                secureTextEntry={props.secureTextEntry}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
		height: 40,
        width: 350,
        borderRadius: 5,
		borderColor: 'gray',
		borderWidth: 0.5,
		marginBottom: 16,
		paddingHorizontal: 10,
	  },
})