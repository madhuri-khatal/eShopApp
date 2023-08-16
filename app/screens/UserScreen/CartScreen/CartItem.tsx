import QuantityComponent from '../../../components/Product/QuantityComponent';
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CartItem = ({item, onRemove}: any) => {
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
      <Image
        source={{uri: item.imageSrc}}
        style={{width: 100, height: 100, marginRight: 16}}
      />

      <View style={{flex: 1}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.title}</Text>
        <Text style={{fontSize: 14, color: '#888', marginBottom: 8}}>
          Price: ₹ {item.price}
        </Text>
        <QuantityComponent />
        
      </View>
      <View style={{marginRight: 15}}>
        <TouchableOpacity onPress={onRemove}>
          <FontAwesome5 name="trash" size={24} color="#cc3a1d" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;
