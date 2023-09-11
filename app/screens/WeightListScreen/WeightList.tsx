import React from 'react';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import WeightItem from './WeightItem';
import {useProductContext} from '../../context/ProductContext';

export default function WeightList({options2}: any) {
  const {productById} = useProductContext();

  const options1 = productById?.attributes;
  let resolvedOptions2 = options2;
  if (options1 && options1.length > 0) {
    resolvedOptions2 = options1[0].options;
  }

  const variations = productById?.variations;
  console.log(variations);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={true}
      style={{flex: 1, flexDirection: 'column'}}>
      <FlatList
        horizontal
        data={resolvedOptions2}
        renderItem={({item, index}) => (
          <WeightItem options2={item} id={variations[index]} />
        )}
        keyExtractor={item => String(item.id)}
      />

      {/* <FlatList
  horizontal
  data={resolvedOptions2}
  renderItem={({ item }) => (
    variations.map((variation: any) => (
      <WeightItem options2={item} id={variation} />
    ))
  )}
  keyExtractor={(item) => String(item.id)}
/> */}
    </ScrollView>
  );
}
