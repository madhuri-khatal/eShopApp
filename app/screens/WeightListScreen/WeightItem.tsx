import { useProductContext } from '../../context/ProductContext';
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
  const {productById} = useProductContext();

  const {setvariation, variations} = useCartContext();
  const [var1, setVar1] = useState<any[]>([]);
  console.log('ID===', id);
  const [selectedWeight, setSelectedWeight] = useState<string>('');
  const onClickVariation = () => {
    // setVar1(id);
    // console.log('VARIATION', var1);

    const variationIndex = productById?.attributes[0]?.options.findIndex(
      (option: string) => option === selectedWeight
    );
    if (variationIndex !== -1) {
      console.log('Selected Weight:', selectedWeight);
      console.log('Variation Index:', productById?.variations[variationIndex]);
    } else {
      console.log('Selected weight does not have a corresponding variation.');
    }
  };
  const handleWeightChange = (weight: string) => {
    setSelectedWeight(weight);
  };
  
  return (
    <TouchableOpacity onPress={onClickVariation}>
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
        <Text>{options2}</Text>
      </View>
    </TouchableOpacity>
  );
}
