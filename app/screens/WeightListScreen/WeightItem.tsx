import {useCartContext} from '../../context/CartContext';
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface IProps {
  icon?: any;
  title?: any;
  options2: string;
  id: any;
}

export default function WeightItem({icon, title, options2, id}: IProps) {
  const {onselectVariationOrWeight, variation} = useCartContext();
  console.log('options2', options2);

  return (
    <TouchableOpacity
      style={{backgroundColor: variation == id ? 'red' : '#fff'}}
      onPress={() => onselectVariationOrWeight(options2, id)}>
      <View
        style={{
          margin: 6,
          padding: 5,
          marginTop: 15,
          marginBottom: 15,
          borderWidth: 0.5,
          borderTopWidth: 7,
          borderColor: '#59a30e',
          borderRadius: 5,
        }}>
        <Text>{id}</Text>
        <Text>{options2}</Text>
      </View>
    </TouchableOpacity>
  );
}
