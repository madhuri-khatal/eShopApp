import {useCartContext} from '../../context/CartContext';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const QuantityComponent = () => {
  const {cartItems, setQuantity, quantity}: any = useCartContext();

  const handleQuantityChange = (newQuantity: any) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.quantityButton}
        onPress={() => handleQuantityChange(quantity - 1)}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantityText}>{quantity}</Text>
      <TouchableOpacity
        style={styles.quantityButton}
        onPress={() => handleQuantityChange(quantity + 1)}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
    width: 110,
  },
  quantityButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    
    backgroundColor: '#f0f0f0',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#505F79',
  },
  quantityText: {
    flex: 2,
    textAlign: 'center',
    fontSize: 18,
    color: '#505F79',
    // color:'red'
  },
});

export default QuantityComponent;
