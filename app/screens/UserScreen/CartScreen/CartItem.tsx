import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useCartContext} from '../../../context/CartContext';

const CartItem = ({item, onRemove}: any) => {
  const {deleteCartItem, onDeletehowDialog, quantity, setQuantity}: any =
    useCartContext();

  const regular_price = item?.prices?.regular_price.substring(
    0,
    item?.prices?.regular_price.length - 2,
  );
  const weight = item?.variation?.[0]?.value;

  // sale price
  const sale_price = item?.prices?.sale_price.substring(
    0,
    item?.prices?.sale_price.length - 2,
  );

  const handleQuantityChange = (newQuantity: any) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  const subTotal = sale_price * item?.quantity;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 10,
        backgroundColor: 'white',
      }}>
      {item.images && item.images.length > 0 && (
        <View>
          <Image
            source={{uri: item.images[0].src}}
            style={{width: 100, height: 100, marginRight: 16}}
          />
          <Text style={{fontSize: 14, color: '#888', marginTop: 8}}>
            Quantity: {weight}
          </Text>
        </View>
      )}
      <View style={{flex: 1, marginLeft: 15}}>
        <Text
          style={{fontSize: 16, fontWeight: 'bold'}}
          numberOfLines={1}
          ellipsizeMode="tail">
          {item.name}
        </Text>

        <Text style={{fontSize: 14, color: '#888', marginBottom: 8}}>
          Price :
          <Text style={{fontSize: 14, color: '#888', marginBottom: 8}}>
            {sale_price} X {item?.quantity} =
          </Text>
          <Text style={{fontSize: 14, color: '#888', fontWeight: 'bold'}}>
            {' '}
            ₹{subTotal}
          </Text>
        </Text>

        <View style={styles.container}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(quantity - 1)}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item?.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(quantity + 1)}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginRight: 15}}>
        <TouchableOpacity onPress={() => onDeletehowDialog(item.key)}>
          <FontAwesome5 name="trash" size={24} color="#e95d2a" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;
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
    color: '#505F79',
  },
  quantityText: {
    flex: 2,
    textAlign: 'center',
    fontSize: 18,
    color: '#505F79',
  },
});
