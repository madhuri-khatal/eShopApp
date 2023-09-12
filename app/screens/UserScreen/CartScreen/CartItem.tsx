import {useProductContext} from '../../../context/ProductContext';
import QuantityComponent from '../../../components/Product/QuantityComponent';
import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useCartContext} from '../../../context/CartContext';

const CartItem = ({item, onRemove}: any) => {
  const {deleteCartItem, onDeletehowDialog}: any = useCartContext();
  const regular_price = item?.prices?.regular_price.substring(
    0,
    item?.prices?.regular_price.length - 2,
  );
  const weight = item?.variation?.[0]?.value;
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
            Weight: {weight}
          </Text>
        </View>
      )}
      <View style={{flex: 1, marginLeft: 10}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.name}</Text>
        <Text style={{fontSize: 14, color: '#888', marginBottom: 8}}>
          Price: ₹ {regular_price}
        </Text>
        <Text style={{fontSize: 14, color: '#888', marginBottom: 8}}>
          Quantity: {item.quantity}
        </Text>
        <QuantityComponent />
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
