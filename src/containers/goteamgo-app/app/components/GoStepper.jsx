import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const QuantityInput = (props) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    props.onChange(quantity);
  }, [quantity]);

  const increment = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrement = () => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, styles.leftButton]} onPress={decrement}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(quantity)}
        onChangeText={text => setQuantity(Number(text))}
      />
      
      <TouchableOpacity style={[styles.button, styles.rightButton]} onPress={increment}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: '#79BFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftButton: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  rightButton: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: 50,
    height: 40,
    textAlign: 'center',
    backgroundColor: '#F2F2F2',
    fontSize: 15,
  },
});

export default QuantityInput;