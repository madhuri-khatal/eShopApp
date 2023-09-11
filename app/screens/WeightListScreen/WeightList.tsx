import React from 'react';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import WeightItem from './WeightItem';
import { useProductContext } from '../../context/ProductContext';
import { Vibration } from 'react-native';

export default function WeightList({ options2 }: any) {
  const { productById } = useProductContext();
  const options1 = productById?.attributes;
    let resolvedOptions2 = options2;
  if (options1 && options1.length > 0) {
    resolvedOptions2 = options1[0].options;
    }

    return (
    <ScrollView
      showsHorizontalScrollIndicator={true}
      style={{ flex: 1, flexDirection: 'column' }}>
      <FlatList
        horizontal
        data={resolvedOptions2}
        renderItem={({ item }) => <WeightItem options2={item} />} 
        keyExtractor={item => String(item.id)}
      />
    </ScrollView>
  );
}

