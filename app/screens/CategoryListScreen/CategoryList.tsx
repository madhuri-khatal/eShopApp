import {View, Text} from 'react-native';
import React from 'react';
import CategoryItem from './CategoryItem';
import {FlatList, ScrollView} from 'react-native-gesture-handler';

const Categories = [
  {
    id: 1,
    icon: 'https://img.freepik.com/free-icon/masala-papad_318-600771.jpg',
    title: 'Papad',
  },
  {
    id: 2,
    icon: 'https://img.freepik.com/free-icon/masala-papad_318-600771.jpg',
    title: 'Pickle',
  },
  {
    id: 3,
    icon: 'https://img.freepik.com/free-icon/masala-papad_318-600771.jpg',
    title: 'vade',
  },
  {
    id: 4,
    icon: 'https://img.freepik.com/free-icon/masala-papad_318-600771.jpg',
    title: 'chips',
  },
  {
    id: 4,
    icon: 'https://img.freepik.com/free-icon/masala-papad_318-600771.jpg',
    title: 'chips',
  },
  {
    id: 4,
    icon: 'https://img.freepik.com/free-icon/masala-papad_318-600771.jpg',
    title: 'chips',
  },
  {
    id: 4,
    icon: 'https://img.freepik.com/free-icon/masala-papad_318-600771.jpg',
    title: 'chips',
  },
];

export default function CategoryList() {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={true} // Hide horizontal scroll indicator
      style={{flex: 1, flexDirection: 'column'}}
      //   contentContainerStyle={{
      //     flexDirection: 'column',
      //     flex: 1,
      //     backgroundColor: 'red',
      //   }} // Align items horizontally
    >
     
      <FlatList
        horizontal
        data={Categories}
        renderItem={({item}) => (
          <CategoryItem icon={item.icon} title={item.title} />
        )}
        keyExtractor={item => String(item.id)}
      />
    </ScrollView>
  );
}
