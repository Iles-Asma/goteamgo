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
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 16,
		paddingHorizontal: 10,
	  },
})