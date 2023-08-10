import {View, Text} from 'react-native';
import React from 'react';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import WeightItem from './WeightItem';

const Categories = [
  {
    id: 1,
    title: '100 gm',
  },
  {
    id: 2,
    title: '250 gm',
  },
  {
    id: 3,
    title: '500 gm',
  },
  {
    id: 4,
    title: '1 kg',
  },
];

export default function WeightList() {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={true} // Hide horizontal scroll indicator
      style={{flex: 1, flexDirection: 'column'}}>
      <FlatList
        horizontal
        data={Categories}
        renderItem={({item}) => <WeightItem title={item.title} />}
        keyExtractor={item => String(item.id)}
      />
    </ScrollView>
  );
}
