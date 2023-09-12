import {useCartContext} from '../../context/CartContext';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const QuantityComponent = () => {
  const {cartItems, setQuantity, quantity}: any = useCartContext();

  // const [quantity, setQuantity] = useState(cartItems?.quantity || 1);

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
    borderRadius: 4,
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
  },
  quantityText: {
    flex: 2,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default QuantityComponent;
