import { useProductContext } from '../../context/ProductContext';
import {useCartContext} from '../../context/CartContext';
import React, {useState,useEffect} from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CurrencyComponent from '../../components/ui/Currencycomponent';

interface IProps {
  icon?: any;
  title?: any;
  options2: string;
  id: any;
}

export default function WeightItem({icon, title, options2, id}: IProps) {
  const {onselectVariationOrWeight, variation} = useCartContext();
 

  return (
    <TouchableOpacity
      // style={{borderColor: variation == id ? 'red' : '#59a30e'}}
      onPress={() => onselectVariationOrWeight(options2, id)}>
      <View
        style={{
          margin: 6,
          padding: 5,
          marginTop: 15,
          marginBottom: 15,
          borderWidth: 0.5,
          borderTopWidth: 7,
          // borderColor: '#59a30e',
          borderColor: variation == id ? '#e95d2a' : '#f7ab8f',
          borderRadius: 5,
        }}>
          <CurrencyComponent value={id} style={{color:"#595555" }}/>

        <Text>{options2}</Text>
      </View>
    </TouchableOpacity>
  );
}
