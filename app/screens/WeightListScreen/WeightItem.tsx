import {useProductContext} from '../../context/ProductContext';
import {useCartContext} from '../../context/CartContext';
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CurrencyComponent from '../../components/ui/Currencycomponent';

interface IProps {
  icon?: any;
  title?: any;
  options2: string;
  id: any;
  price: any;
  regularPrice: any;
  onWeightItemClick: (id: any) => void;
}

export default function WeightItem({
  icon,
  title,
  options2,
  id,
  onWeightItemClick,
  price,
  regularPrice,
}: IProps) {
  const {onselectVariationOrWeight, variation} = useCartContext();

  const pressItem = () => {
    onselectVariationOrWeight(options2, id);
    onWeightItemClick(id);
  };

  return (
    <>
      {/* <TouchableOpacity onPress={() => onWeightItemClick(id)}></TouchableOpacity> */}

      <TouchableOpacity onPress={pressItem}>
        {/* <TouchableOpacity
      // style={{borderColor: variation == id ? 'red' : '#59a30e'}}
      onPress={() => onselectVariationOrWeight(options2, id)}> */}
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
          {regularPrice > 0 && regularPrice !== price ? (
            <>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CurrencyComponent
                  value={regularPrice}
                  style={{textDecorationLine: 'line-through', color: '#b1b1b1'}}
                />
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CurrencyComponent value={price} style={{color: '#595555'}} />
              </View>
            </>
          ) : (
            <>
              <CurrencyComponent value={price} style={{color: '#595555'}} />
            </>
          )}

          <Text>{options2}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}
